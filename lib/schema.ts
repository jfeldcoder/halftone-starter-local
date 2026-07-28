/**
 * LocalBusiness structured data (schema.org JSON-LD).
 *
 * This is the single biggest local-SEO win most small clinics/spas never do:
 * it tells Google exactly what the business is, where, when, and how to reach it,
 * powering the rich result / knowledge panel. Built entirely from lib/site.ts,
 * so filling that file out gives every build correct structured data for free.
 *
 * Honest by default: individual reviews are NOT emitted (the starter's on-page
 * ones are placeholders), and aggregateRating is opt-in via site.seo.includeRating.
 */
import { site } from "@/lib/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || site.url;

export function localBusinessSchema(): Record<string, unknown> {
  const s = site.seo;
  const sameAs = [site.socials.instagram, site.socials.facebook].filter(Boolean);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": s.schemaType,
    "@id": `${SITE_URL}/#business`,
    name: site.name,
    description: site.description,
    url: SITE_URL,
    telephone: site.phone,
    email: site.email,
    priceRange: s.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.streetAddress || site.address,
      addressLocality: s.city || undefined,
      addressRegion: s.region || undefined,
      postalCode: s.postalCode || undefined,
      addressCountry: s.country || "US",
    },
  };

  if (s.image) schema.image = new URL(s.image, SITE_URL).toString();
  if (site.mapUrl) schema.hasMap = site.mapUrl;
  if (sameAs.length) schema.sameAs = sameAs;
  if (s.areaServed.length) schema.areaServed = s.areaServed;

  if (s.geo.latitude && s.geo.longitude) {
    schema.geo = { "@type": "GeoCoordinates", latitude: s.geo.latitude, longitude: s.geo.longitude };
  }

  const spec = openingHoursSpec();
  if (spec.length) schema.openingHoursSpecification = spec;

  // Opt-in only — never emit an unearned rating.
  if (s.includeRating) {
    const ratingValue = parseFloat(site.rating.stars);
    const reviewCount = parseInt(site.rating.count, 10);
    if (!Number.isNaN(ratingValue) && !Number.isNaN(reviewCount) && reviewCount > 0) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: String(ratingValue),
        reviewCount: String(reviewCount),
        bestRating: "5",
      };
    }
  }

  return schema;
}

// ── helpers ──

const DAY_MAP: Record<string, string> = {
  mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday",
  fri: "Friday", sat: "Saturday", sun: "Sunday",
};

// Best-effort conversion of the human-readable `hours` array into schema.org
// OpeningHoursSpecification. Skips rows it can't confidently parse (e.g. "Closed")
// rather than emitting wrong data.
function openingHoursSpec(): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  for (const row of site.hours) {
    const days = parseDays(row.day);
    const times = parseTimes(row.time);
    if (!days.length || !times) continue;
    out.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days,
      opens: times.opens,
      closes: times.closes,
    });
  }
  return out;
}

function parseDays(label: string): string[] {
  const tokens = label.toLowerCase().match(/mon|tue|wed|thu|fri|sat|sun/g);
  if (!tokens) return [];
  const order = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  // "Mon to Fri" → a range; a single token → that day.
  if (/to|-|–|through/.test(label) && tokens.length >= 2) {
    const a = order.indexOf(tokens[0]);
    const b = order.indexOf(tokens[tokens.length - 1]);
    if (a === -1 || b === -1 || b < a) return tokens.map((t) => DAY_MAP[t]);
    return order.slice(a, b + 1).map((t) => DAY_MAP[t]);
  }
  return tokens.map((t) => DAY_MAP[t]);
}

// "9:00 to 7:00" → { opens: "09:00", closes: "19:00" }. Assumes a clinic/spa day
// (opens AM, closes PM) since these sources rarely carry am/pm.
function parseTimes(label: string): { opens: string; closes: string } | null {
  const nums = label.match(/(\d{1,2})(?::(\d{2}))?/g);
  if (!nums || nums.length < 2) return null;
  const toHM = (t: string, assumePM: boolean) => {
    const [h, m = "00"] = t.split(":");
    let hour = parseInt(h, 10);
    if (assumePM && hour < 12) hour += 12; // afternoon close
    return `${String(hour).padStart(2, "0")}:${m.padStart(2, "0")}`;
  };
  return { opens: toHM(nums[0], false), closes: toHM(nums[1], true) };
}
