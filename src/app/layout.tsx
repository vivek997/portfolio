import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personal } from "@/data/portfolio";
import ThemeInitScript from "@/components/ThemeInitScript";
import ThemeToggle from "@/components/ThemeToggle";
import CursorTrail from "@/components/CursorTrail";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://vivekrawal.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${personal.name} - ${personal.role}`,
  description: personal.summary,
  keywords: [
    "Vivek Rawal",
    "Software Engineer",
    "Python Developer",
    "GenAI Developer",
    "Backend Developer",
    "Django Developer",
    "AWS",
    "New Delhi",
    "India",
  ],
  authors: [{ name: personal.name, url: siteUrl }],
  creator: personal.name,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${personal.name} - ${personal.role}`,
    description: personal.summary,
    url: siteUrl,
    siteName: personal.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} - ${personal.role}`,
    description: personal.summary,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.fullName,
  alternateName: personal.name,
  jobTitle: personal.role,
  description: personal.summary,
  url: siteUrl,
  image: `${siteUrl}/avatar.jpg`,
  email: `mailto:${personal.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressRegion: "NCR",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: "LTIMindtree",
  },
  sameAs: [personal.github, personal.linkedin],
  knowsAbout: [
    "Python",
    "Django",
    "Flask",
    "GenAI",
    "AWS",
    "Backend Development",
    "API Design",
    "Cloud Infrastructure",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeInitScript />
        {/* Static, hard-coded JSON-LD with no user input -- safe to inject as-is. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text selection:bg-green selection:text-bg">
        <div className="vignette" />
        <div className="scanlines" />
        <CursorTrail />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
