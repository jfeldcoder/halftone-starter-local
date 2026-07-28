import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

// Swap these for the client's brand fonts. Keep the CSS variable names.
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || site.url;
const ogImages = site.seo.image ? [{ url: site.seo.image }] : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  // Canonical URL avoids duplicate-content issues (www vs non-www, trailing slash, etc.).
  alternates: { canonical: "/" },
  // Explicitly allow indexing + rich snippets.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: site.name,
    description: site.description,
    url: SITE_URL,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: ogImages,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ogImages },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <JsonLd data={localBusinessSchema()} />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
