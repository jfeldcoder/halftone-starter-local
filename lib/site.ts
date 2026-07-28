/**
 * ── EDIT THIS FILE FIRST for every new client. ──
 * Local-service tier (med spas, salons, clinics). Single source of truth for
 * brand, services, reviews, hours, and location. Then rebrand colors/fonts in
 * app/globals.css + app/layout.tsx.
 */

export const site = {
  name: "Client Spa",
  tagline: "Advanced skincare and wellness, in the heart of the city.",
  description:
    "A boutique med spa offering injectables, facials, and body treatments delivered by licensed providers.",
  url: "https://example.com",

  // Contact + booking.
  email: "hello@example.com",
  phone: "(305) 555-0100",
  // If they use an external booking system (Vagaro, Boulevard, etc.), put the
  // link here and the buttons deep-link to it. Leave empty to scroll to the
  // inquiry form instead.
  bookingUrl: "",

  nav: [
    { label: "Services", href: "#services" },
    { label: "Reviews", href: "#reviews" },
    { label: "Visit", href: "#visit" },
  ],

  // Trust line under the hero.
  rating: { stars: "4.9", count: "200+", source: "Google" },

  // Service menu — grouped. Prices optional (omit `price` to hide it).
  services: [
    {
      group: "Injectables",
      items: [
        { name: "Neurotoxin (Botox / Dysport)", note: "per unit", price: "$12" },
        { name: "Dermal Fillers", note: "per syringe", price: "from $650" },
        { name: "Lip Enhancement", note: "45 min", price: "from $650" },
      ],
    },
    {
      group: "Facials & Skin",
      items: [
        { name: "Signature HydraFacial", note: "60 min", price: "$250" },
        { name: "Morpheus8 RF Microneedling", note: "per area", price: "from $900" },
        { name: "Chemical Peel", note: "30 min", price: "from $150" },
      ],
    },
    {
      group: "Body & Wellness",
      items: [
        { name: "IV Vitamin Drip", note: "45 min", price: "from $175" },
        { name: "Laser Hair Removal", note: "per session", price: "from $99" },
      ],
    },
  ],

  // Social proof.
  reviews: [
    { quote: "The most natural results I have ever had. The team actually listens.", name: "Maria G." },
    { quote: "Clean, calm, and genuinely expert. My only med spa now.", name: "Daniela R." },
    { quote: "Booking was easy and the results speak for themselves.", name: "Sofia L." },
  ],

  // Visit.
  address: "123 Example Ave, Suite 100, City, ST 00000",
  mapUrl: "https://maps.google.com/?q=123+Example+Ave",
  hours: [
    { day: "Mon to Fri", time: "9:00 to 7:00" },
    { day: "Saturday", time: "9:00 to 4:00" },
    { day: "Sunday", time: "Closed" },
  ],

  socials: {
    instagram: "",
    facebook: "",
  },

  // ── SEO / structured data ──
  // Powers the LocalBusiness JSON-LD (lib/schema.ts) + metadata. Fill per client.
  seo: {
    // Closest schema.org type. Med spa → "HealthAndBeautyBusiness" or "MedicalBusiness";
    // salon → "HairSalon"/"BeautySalon"; PT clinic → "PhysicalTherapy"; dentist → "Dentist".
    schemaType: "HealthAndBeautyBusiness",
    priceRange: "$$",
    // Neighborhoods / cities served — helps local relevance (e.g. ["Aventura", "Sunny Isles Beach"]).
    areaServed: [] as string[],
    // Precise coordinates: Google Maps → right-click the pin → copy lat,long. Improves local/map.
    geo: { latitude: "", longitude: "" },
    // Structured address. Leave blank to fall back to the `address` string above.
    streetAddress: "",
    city: "",
    region: "", // state, e.g. "FL"
    postalCode: "",
    country: "US",
    // Social + share image at /public (1200x630). Used for OpenGraph + schema. Leave "" to skip.
    image: "",
    // ONLY set true when `rating` above is the client's REAL, verifiable Google rating.
    // Emitting an unearned aggregateRating can get a site penalized — keep false by default.
    includeRating: false,
  },

  builtBy: { label: "Halftone", href: "https://halftone-fawn.vercel.app" },
} as const;

export type Site = typeof site;

// Where the "Book" buttons go: external system if set, else the inquiry form.
export const bookHref = site.bookingUrl || "#visit";
