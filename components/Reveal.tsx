"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Basamaklı gecikme (referanstaki i%5*60ms ile aynı his). */
  index?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  /** Kart hover glow'u için doğrudan elemana bağlanır. */
  onPointerMove?: React.PointerEventHandler<HTMLElement>;
}

/**
 * IntersectionObserver ile fade-up. prefers-reduced-motion açıkken
 * içerik anında görünür kalır (CSS tarafında da güvence altında).
 */
export default function Reveal({
  children,
  index = 0,
  as: Tag = "div",
  className = "",
  style,
  onPointerMove,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ transitionDelay: `${(index % 5) * 60}ms`, ...style }}
      onPointerMove={onPointerMove}
    >
      {children}
    </Tag>
  );
}
