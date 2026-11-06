import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

import Nav from "@/components/Nav";
import { site } from "@/lib/content";

import "./globals.css";

// İki font ailesi: Bricolage Grotesque (başlık) + Instrument Sans (gövde).
// Mono font kaldırıldı: sitede gösterilen gerçek kod yok, yalnızca süs olarak
// duruyordu. Satır içi <code> sistem mono yığınıyla basılır.
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#151412" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main">İçeriğe geç</a>
        <Nav />
        {children}
      </body>
    </html>
  );
}
