"use client";

import { useCallback, useRef, useState } from "react";

import ProjectModal from "@/components/ProjectModal";
import Reveal from "@/components/Reveal";
import { projects, projectsSection, type Project } from "@/lib/content";
import { rich } from "@/lib/rich-text";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  /** Modal kapanınca odak "Detay" butonuna geri döner. */
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setActive(null);
    lastTrigger.current?.focus();
  }, []);

  /** Kart üstündeki hover glow'un yatay konumu. */
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
  };

  return (
    <section id="work" className="section">
      <div className="wrap">
        <Reveal className="sec-eyebrow" index={0}>
          {projectsSection.eyebrow}
        </Reveal>
        <Reveal as="h2" index={1}>
          {projectsSection.heading}
        </Reveal>
        <Reveal as="p" className="lead" index={2} style={{ marginBottom: 40 }}>
          {rich(projectsSection.lead)}
        </Reveal>

        <div className="projects">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              as="article"
              className={`card${project.wide ? " wide" : ""}`}
              index={i}
              onPointerMove={onPointerMove}
            >
              <div className="card-top">
                <h3>{project.title}</h3>
                <span className={`badge ${project.badge.kind}`}>
                  {project.badge.kind === "live" ? "● " : ""}
                  {project.badge.label}
                </span>
              </div>

              <p>{project.summary}</p>

              <div className="tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="card-actions">
                <button
                  type="button"
                  className="detail-btn"
                  aria-haspopup="dialog"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setActive(project);
                  }}
                >
                  Detay →
                </button>
                <a
                  className="card-link"
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.link.label}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  );
}
