"use client";

import { useEffect, useState } from "react";

type State = "idle" | "copied" | "failed";

const LABEL: Record<State, string> = {
  idle: "Kopyala",
  copied: "Kopyalandı",
  failed: "Kopyalanamadı, adresi elle seç",
};

/** E-posta adresini panoya kopyalar; sonucu ekran okuyucuya da bildirir. */
export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = window.setTimeout(() => setState("idle"), 2400);
    return () => window.clearTimeout(t);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <button type="button" className={`copy-btn ${state}`} onClick={copy}>
      <span aria-live="polite">{LABEL[state]}</span>
    </button>
  );
}
