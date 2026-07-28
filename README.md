# Halftone client starter · Local service tier

For **local service businesses** that convert on booking: med spas, salons, clinics,
dental. Next.js 16 + Tailwind v4 + TypeScript. Ships with a service menu, reviews,
hours + location, and a working inquiry form that emails the owner.

For a simple static brochure site, use the **marketing** starter instead.

## Start a new client (about 10 minutes)

1. On GitHub: **jfeldcoder/halftone-starter-local → "Use this template"** → name it
   `client-<name>`. Clone into `clients/<name>/`.
2. `npm install && npm run dev`.
3. **Rebrand — two files:**
   - `lib/site.ts` — name, tagline, **services menu (groups + items + prices)**,
     **reviews**, **hours**, **address / map**, phone, email, socials, and
     `bookingUrl` (external system) or leave empty to use the built-in form.
   - `app/globals.css` — the `:root` color tokens (a warm bronze by default) + fonts
     in `app/layout.tsx`.
4. **Wire the inquiry email:** sign up at resend.com, set `RESEND_API_KEY` (and
   optionally `INQUIRY_TO_EMAIL`) in `.env.local` and Vercel. Without a key the form
   still works (accepts + logs), it just does not send yet.
5. Add real photos (hero, gallery), build any extra pages, deploy to Vercel with the
   client's domain and `NEXT_PUBLIC_SITE_URL`.

## What's inside

```
app/
  page.tsx            hero + services menu + reviews + visit (hours/map + form)
  layout.tsx          fonts + SEO metadata + LocalBusiness JSON-LD (reads lib/site.ts)
  globals.css         warm design tokens (REBRAND HERE) + helpers
  api/inquiry/route.ts  inquiry -> email via Resend (honeypot + rate limit + validation)
  sitemap.ts / robots.ts
components/
  Nav.tsx / Footer.tsx  nav with Book CTA; footer with hours + location
  InquiryForm.tsx       client form -> /api/inquiry
  JsonLd.tsx            renders schema.org JSON-LD
  Reveal.tsx            on-load fade (no-JS safe)
lib/
  site.ts             ← single source of truth (brand, services, reviews, hours, seo)
  schema.ts           LocalBusiness structured data (built from site.ts)
  inquiry.ts          zod schema for the form
  cn.ts
```

## SEO — ships SEO-ready

Every build gets the on-page/technical basics for free (these are what most template
sites the clients come from are missing):

- **LocalBusiness JSON-LD** (`lib/schema.ts` → injected in `layout.tsx`): name, address,
  phone, geo, price range, area served, and opening hours — the structured data Google
  uses for the rich result / map panel. Opening hours are parsed from `site.hours`.
- Per-page `<title>` + meta description + canonical + OpenGraph/Twitter cards, explicit
  `robots` allow + rich-snippet hints, `sitemap.xml`, `robots.txt`, semantic headings,
  and fast/mobile by default (Next 16 on Vercel).

**Per client — fill the `seo` block in `lib/site.ts`:** `schemaType` (pick the closest —
`PhysicalTherapy`, `Dentist`, `HairSalon`, …), structured address, `geo` coords, `areaServed`
neighborhoods, and add `/public/og.jpg` (1200×630). Set `NEXT_PUBLIC_SITE_URL` in Vercel.

> **Honesty guardrail:** `aggregateRating` is **off by default**. Only set
> `seo.includeRating: true` when `rating` is the client's real, verifiable Google rating —
> a fake rating in schema can get a site penalized. Individual reviews are never emitted.

**Validate after deploy:** paste the URL into Google's
[Rich Results Test](https://search.google.com/test/rich-results), then submit the sitemap
in Google Search Console.

The ongoing local-SEO work (Google Business Profile, reviews, citations, content) is a
separate service — the **Growth Partner** retainer, not part of the free build.

## Conventions

- **Everything is data.** Services, reviews, hours, and contact all live in
  `lib/site.ts`. No hardcoded content in components.
- **Colors come from tokens** — rebrand from one CSS block. Default is a calm warm
  palette suited to spas; swap `--accent` for the client's color.
- The **Book** buttons deep-link to `bookingUrl` if set, else scroll to the form.
- Accessible + no-JS safe by default.

Built and maintained by Halftone.
