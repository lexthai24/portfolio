import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getProfile } from "@/lib/content";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    metadataBase: new URL("https://lex.nvxthai.dev"),
    title: `${profile.name} — ${profile.role}`,
    description:
      "Senior software engineer building complex products from requirements and UX through architecture, implementation, and production — including Scalptra, an AI-assisted futures trading platform.",
    openGraph: {
      title: `${profile.name} — ${profile.role}`,
      description:
        "Complex products, carried all the way to production. Explore Scalptra and selected engineering work.",
      type: "website",
      images: [
        {
          url: "/projects/scalptra01.png",
          width: 1920,
          height: 1080,
          alt: "Scalptra — AI-assisted futures trading platform",
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
