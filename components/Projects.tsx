import Link from "next/link";

import ActionLink from "@/components/ActionLink";
import Icon from "@/components/Icon";
import Section from "@/components/Section";
import Status from "@/components/Status";
import { projects, projectsSection } from "@/lib/content";
import { rich } from "@/lib/rich-text";

export default function Projects() {
  return (
    <Section id="work" label={projectsSection.eyebrow} heading={projectsSection.heading}>
      <p className="lead">{rich(projectsSection.lead)}</p>

      {/* Eşit kart ızgarası yerine okunur bir liste: ad + durum solda, anlatım sağda. */}
      <ol className="project-list">
        {projects.map((project) => (
          <li key={project.slug} className="project">
            <div className="project-head">
              <h3>{project.title}</h3>
              <Status badge={project.badge} />
            </div>

            <div className="project-body">
              <p>{project.summary}</p>
              <p className="stack">
                <span className="sr-only">Teknolojiler: </span>
                {project.tags.join(" · ")}
              </p>

              <div className="project-actions">
                <Link href={`/projeler/${project.slug}`} className="btn ghost">
                  Detay
                  <span className="sr-only">: {project.title}</span>
                  <Icon name="arrow-right" />
                </Link>
                {project.link && (
                  <ActionLink
                    href={project.link.href}
                    label={project.link.label}
                    variant="text"
                    external
                  />
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
