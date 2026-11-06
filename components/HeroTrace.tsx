/**
 * Hero süsü: bir isteğin yolu. Paket istemciden API'ye, oradan vektör aramaya
 * ve LLM'e gidip yanıtla geri döner; vardığı kutu bir an vurgulanır.
 * Sayfa açılışında BİR KEZ oynar (sonsuz döngü yok). Azaltılmış harekette
 * paket hiç çıkmaz, şema statik durur. Belirli bir projeyi değil, işin
 * genel şeklini anlatır — teknik iddia taşımaz.
 *
 * SVG sabit piksel boyutunda (ölçeklenmez) — yazılar 16px kalır.
 * Dar ekranda gizli (globals.css → .hero-trace).
 */

const NODES = [
  { id: "client", x: 0, y: 88, label: "İstemci" },
  { id: "api", x: 148, y: 88, label: ".NET API", core: true },
  { id: "vec", x: 324, y: 24, label: "pgvector" },
  { id: "llm", x: 324, y: 152, label: "LLM" },
] as const;

const W = 116;
const H = 44;

export default function HeroTrace() {
  return (
    <figure className="hero-trace rise" style={{ "--i": 3 } as React.CSSProperties}>
      <svg width="440" height="196" viewBox="0 0 440 196" aria-hidden="true" focusable="false">
        {/* Paket kutuların ARKASINDAN geçer: kutuya "girip çıkıyor" gibi görünür. */}
        <circle className="trace-packet" r="5" />

        <path className="trace-line" d="M96 110 H148 M264 110 H294 V46 H324 M294 110 V174 H324" />

        {NODES.map((n) => {
          const w = n.id === "client" ? 96 : W;
          return (
            <g key={n.id}>
              <rect
                className={`trace-node${"core" in n && n.core ? " core" : ""}`}
                x={n.x + 0.5}
                y={n.y + 0.5}
                width={w - 1}
                height={H - 1}
                rx="4"
              />
              <rect
                className={`trace-hit hit-${n.id}`}
                x={n.x + 0.5}
                y={n.y + 0.5}
                width={w - 1}
                height={H - 1}
                rx="4"
              />
              <text className="trace-label" x={n.x + w / 2} y={n.y + H / 2} dy="0.35em">
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>Bir isteğin yolu: API, vektör arama, LLM ve yanıt.</figcaption>
    </figure>
  );
}
