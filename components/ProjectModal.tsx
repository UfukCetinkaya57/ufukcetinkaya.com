"use client";

import { useEffect, useId, useRef } from "react";

import type { Project } from "@/lib/content";
import { rich } from "@/lib/rich-text";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descId = useId();

  /* Açılışta odağı kapat butonuna al. */
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  /* Arka planın kaymasını engelle. */
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  /* ESC ile kapat + focus trap. */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === closeRef.current,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (e.shiftKey && (current === first || !dialog.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const { detail, badge, title } = project;

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          aria-label="Kapat"
          onClick={onClose}
        >
          ×
        </button>

        <div className="m-top">
          <h3 id={titleId}>{title}</h3>
          <span className={`badge ${badge.kind}`}>
            {badge.kind === "live" ? "● " : ""}
            {badge.label}
          </span>
        </div>

        <div className="m-role">{detail.role}</div>
        <p className="m-desc" id={descId}>
          {detail.desc}
        </p>

        <p className="m-label">Öne Çıkan Teknik Kararlar</p>
        <ul>
          {detail.bullets.map((bullet, i) => (
            <li key={i}>{rich(bullet)}</li>
          ))}
        </ul>

        <p className="m-label">Teknoloji Seti</p>
        <div className="m-stack">
          {detail.stack.map((item) => (
            <span className="tag" key={item}>
              {item}
            </span>
          ))}
        </div>

        {detail.link && (
          <div className="m-actions">
            <a
              className="btn primary"
              href={detail.link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {detail.link.label}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
