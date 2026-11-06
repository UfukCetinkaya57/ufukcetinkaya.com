import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  /** Sol sütundaki bölüm adı (geniş ekranda başlığın yanında durur, üstünde değil). */
  label: string;
  heading: ReactNode;
  children?: ReactNode;
}

/**
 * Bölüm iskeleti: geniş ekranda iki sütun (bölüm adı | içerik),
 * dar ekranda tek sütun. Bölüm adı başlığın aynı satırına hizalanır.
 */
export default function Section({ id, label, heading, children }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <div className="wrap sec-grid">
        <p className="sec-label">{label}</p>
        <div className="sec-body">
          <h2 id={headingId}>{heading}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}
