"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const serviceGroups = site.services.map((s) => s.group);

export default function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error(b.error || "Something went wrong.");
      }
      setStatus("done");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-bg p-8 text-center">
        <p className="display text-2xl font-bold text-fg">Thank you.</p>
        <p className="mt-2 text-sm text-fg-muted">
          We received your request and will be in touch shortly.
        </p>
      </div>
    );
  }

  const field = "w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-bg p-6 sm:p-8">
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={field} />
        <input name="email" type="email" required placeholder="Email" className={field} />
        <input name="phone" placeholder="Phone (optional)" className={field} />
        <select name="service" defaultValue="" className={field}>
          <option value="">Service of interest</option>
          {serviceGroups.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="What are you looking for?"
        className={`${field} mt-4 resize-y`}
      />
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request an appointment"}
      </button>
    </form>
  );
}
