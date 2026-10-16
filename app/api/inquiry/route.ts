import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { InquirySchema } from "@/lib/inquiry";
import { site } from "@/lib/site";

export const runtime = "nodejs";

// Per-instance rate limit. A deterrent alongside the honeypot, not a guarantee.
const hits = new Map<string, number[]>();
function rateLimited(ip: string, max = 5, windowMs = 60_000) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > max;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots do not learn they were caught.
  if (body && typeof body === "object" && (body as { company?: string }).company) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const parsed = InquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const { name, email, phone, service, message } = parsed.data;
  const to = process.env.INQUIRY_TO_EMAIL || site.email;
  const from = process.env.INQUIRY_FROM_EMAIL || "Bookings <onboarding@resend.dev>";
  const key = process.env.RESEND_API_KEY;

  // No key configured yet: accept and log, so the form works before email is wired.
  if (!key) {
    console.log("[inquiry] (no RESEND_API_KEY, not sent):", { name, email, phone, service });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(key);
    // The Resend SDK reports failures (limits, bad key, unverified sender) in `error` rather than throwing.
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New inquiry · ${service || "General"} · ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        service ? `Service: ${service}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[inquiry] send failed:", err instanceof Error ? err.message : err, { name, email, phone });
    return NextResponse.json({ error: "Could not send right now. Please call or email us." }, { status: 502 });
  }
}
