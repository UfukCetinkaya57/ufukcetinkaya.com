import type { Badge } from "@/lib/content";

/** Proje durumu. Yeşil nokta yalnızca "canlı" durumunu anlatır; animasyonsuz. */
export default function Status({ badge }: { badge: Badge }) {
  return (
    <span className={`status ${badge.kind}`}>
      {badge.kind === "live" && <span className="status-dot" aria-hidden="true" />}
      {badge.label}
    </span>
  );
}
