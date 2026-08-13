import { ImageResponse } from "next/og";

import { site } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

/**
 * Paylaşım kartı. Renkler globals.css'teki token'larla aynı
 * (bg #0a0f1a, accent #5aa9ff, muted #8ba0bd).
 */
export default function OpengraphImage() {
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
          background:
            "radial-gradient(900px 600px at 85% -15%, rgba(90,169,255,.22), transparent 60%), linear-gradient(160deg, #0a0f1a 0%, #0b1120 55%, #0c1424 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#8fc4ff",
            fontSize: 25,
            letterSpacing: 6,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#5aa9ff",
              display: "flex",
            }}
          />
          C# · .NET · RAG · AGENTIC AI
        </div>

        <div
          style={{
            marginTop: 34,
            fontSize: 82,
            fontWeight: 700,
            color: "#f3f8ff",
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
            color: "#5aa9ff",
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
            color: "#8ba0bd",
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
    size,
  );
}
