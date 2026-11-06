import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ActionLink from "@/components/ActionLink";
import ArchDiagram from "@/components/ArchDiagram";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import Status from "@/components/Status";
import { projects } from "@/lib/content";
import { rich } from "@/lib/rich-text";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projeler/${project.slug}` },
    openGraph: { title: project.title, description: project.summary },
  };
}

/**
 * Proje dökümü — her proje aynı sırayla anlatılır:
 * ne / mimari / öne çıkan kararlar / teknoloji seti.
 */
export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const { detail } = project;
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <>
      <main id="main" className="page">
        <article className="wrap case">
          <p className="case-back">
            <Link href="/#work" className="text-link">
              <Icon name="arrow-left" />
              Tüm projeler
            </Link>
          </p>

          <header className="case-head">
            <h1 className="page-title">{project.title}</h1>
            <p className="case-meta">
              <Status badge={project.badge} />
              <span>{detail.role}</span>
            </p>
            <p className="lead">{detail.desc}</p>
            {detail.link && (
              <div className="case-cta">
                <ActionLink
                  href={detail.link.href}
                  label={detail.link.label}
                  variant="primary"
                  external
                />
              </div>
            )}
          </header>

          {detail.architecture && (
            <section className="case-sec" aria-labelledby="arch-title">
              <h2 id="arch-title" className="case-h">
                Mimari
              </h2>
              <ArchDiagram architecture={detail.architecture} bullets={detail.bullets} />
            </section>
          )}

          <section className="case-sec" aria-labelledby="decisions-title">
            <h2 id="decisions-title" className="case-h">
              Öne çıkan teknik kararlar
            </h2>
            <ul className="decision-list">
              {detail.bullets.map((bullet, i) => (
                <li key={i}>{rich(bullet)}</li>
              ))}
            </ul>
          </section>

          <section className="case-sec" aria-labelledby="stack-title">
            <h2 id="stack-title" className="case-h">
              Teknoloji seti
            </h2>
            <p className="stack">{detail.stack.join(" · ")}</p>
          </section>

          <nav className="case-nav" aria-label="Diğer projeler">
            {prev ? (
              <Link href={`/projeler/${prev.slug}`} className="case-nav-link">
                <span className="case-nav-dir">
                  <Icon name="arrow-left" />
                  Önceki
                </span>
                <span className="case-nav-title">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/projeler/${next.slug}`} className="case-nav-link next">
                <span className="case-nav-dir">
                  Sonraki
                  <Icon name="arrow-right" />
                </span>
                <span className="case-nav-title">{next.title}</span>
              </Link>
            )}
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
