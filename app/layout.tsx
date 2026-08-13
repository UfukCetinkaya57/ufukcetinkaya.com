import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Space_Mono } from "next/font/google";

import Nav from "@/components/Nav";
import { site } from "@/lib/content";

import "./globals.css";

// Bricolage Grotesque değişken bir font: opsz ekseni harf genişliğini etkiler
// (h1'deki `max-width:15ch` buna bağlı). weight dizisi verilirse next/font sabit
// bir kesit üretir ve opsz kilitlenir; referanstaki tipografiyi birebir korumak
// için değişken sürümü kullanıyoruz.
const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// Space Mono'da "→" gibi ok glifleri yok; tarayıcı yedek fonta düşer.
// next/font'un otomatik ürettiği metrik-yedeği bu glifi referanstakinden geniş
// çizip buton genişliklerini kaydırıyordu — referansın yedek zinciri sabitlendi.
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    ".NET",
    "C#",
    "Backend Developer",
    "ASP.NET Core",
    "Clean Architecture",
    "PostgreSQL",
    "pgvector",
    "RAG",
    "Semantic Kernel",
    "Agentic AI",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <div className="bg-atmos" aria-hidden="true" />
        <div className="bg-grid" aria-hidden="true" />
        <Nav />
        {children}
      </body>
    </html>
  );
}
