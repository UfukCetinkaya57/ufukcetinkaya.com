import { ImageResponse } from "next/og";

import { ogFonts } from "@/lib/og-fonts";
import { site } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

/**
 * Paylaşım kartı. Renkler globals.css'teki açık tema token'larıyla aynı
 * (bg #f3f0e8, accent #b4441c, muted #55524a).
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "#f3f0e8",
          fontFamily: "Instrument Sans",
        }}
      >
        <div style={{ display: "flex", color: "#55524a", fontSize: 28 }}>
          C# · .NET · RAG · Agentic AI
        </div>

        <div
          style={{
            marginTop: 34,
            fontSize: 82,
            fontWeight: 700,
            fontFamily: "Bricolage Grotesque",
            color: "#12110e",
            letterSpacing: -2,
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 42,
            color: "#b4441c",
            fontWeight: 600,
            display: "flex",
          }}
        >
          {site.role}
        </div>

        <div
          style={{
            marginTop: 34,
            fontSize: 27,
            color: "#55524a",
            maxWidth: 900,
            lineHeight: 1.45,
            display: "flex",
          }}
        >
          Production SaaS + RAG & agentic AI sistemleri. Clean Architecture,
          PostgreSQL/pgvector, Semantic Kernel.
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
