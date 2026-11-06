"use client";

import { useSyncExternalStore } from "react";

/* 404 statik üretilir: sunucu istenen yolu bilmez. Yol hydration'dan sonra,
   yalnızca istemcide okunur (sunucu anlık görüntüsü boş → uyumsuzluk yok). */
const noop = () => () => {};

export default function RequestedPath() {
  const path = useSyncExternalStore(
    noop,
    () => window.location.pathname,
    () => "",
  );
  return (
    <p className="nf-req">
      <code>GET {path || "/"}</code>
      <span>404 Not Found</span>
    </p>
  );
}
