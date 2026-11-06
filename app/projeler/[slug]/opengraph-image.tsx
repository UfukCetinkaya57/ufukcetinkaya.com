import { ImageResponse } from "next/og";

import { ogFonts } from "@/lib/og-fonts";
import { projects, site } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Proje dökümü";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Özetin kart sığacak kadarı: cümle sınırında kes, cümle bölme. */
function excerpt(text: string, max = 180) {
  // Cümle sonu = nokta + boşluk. ".NET" gibi noktayla başlayan kelimeler bölünmez.
  const sentences = text.split(/(?<=\.)\s+/);
  let out = "";
  for (const s of sentences) {
    const next = out ? `${out} ${s}` : s;
    if (out && next.length > max) break;
    out = next;
  }
  return out;
}

/**
 * Proje paylaşım kartı. Ana kartla aynı açık tema token'ları
 * (bg #f3f0e8, accent #b4441c, muted #55524a, green #2f7a4f).
 */
export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug) ?? projects[0];
  const live = project.badge.kind === "live";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 90px",
          background: "#f3f0e8",
          fontFamily: "Instrument Sans",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 28,
              color: live ? "#2f7a4f" : "#55524a",
            }}
          >
            {live && (
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  background: "#2f7a4f",
                  marginRight: 14,
                }}
              />
            )}
            {project.badge.label}
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 76,
              fontWeight: 700,
              fontFamily: "Bricolage Grotesque",
              color: "#12110e",
              letterSpacing: -2,
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            {project.title}
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "#55524a",
              maxWidth: 980,
              lineHeight: 1.45,
              display: "flex",
            }}
          >
            {excerpt(project.summary)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 28,
            borderTop: "2px solid #b4441c",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex", color: "#12110e", fontWeight: 600 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", color: "#55524a" }}>
            {project.tags.join(" · ")}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
