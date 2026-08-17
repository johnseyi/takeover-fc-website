import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/ui";
import { site } from "@/content/site";
import { DEFAULT_OG_IMAGE, organizationSchema } from "@/lib/seo";

/* Typography (§7): Inter for body, navigation, buttons, statistics and
   captions; Anton as the condensed athletic display face for hero headlines,
   matchday, player names, section headings and large statistics. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Takeover FC",
    "Takeover Creatives FC",
    "Takeover Creatives Football Club",
    "football clubs in Kampala",
    "youth football Kampala",
    "football academy Kampala",
    "youth football Uganda",
    "football development Uganda",
    "community football Uganda",
  ],
  authors: [{ name: site.name }],
  creator: site.parentOrganisation,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_UG",
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#03130a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-UG" className={`${inter.variable} ${anton.variable}`}>
      <body className="min-h-screen antialiased">
        <JsonLd data={organizationSchema()} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
