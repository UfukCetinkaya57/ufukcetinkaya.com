import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import RequestedPath from "@/components/RequestedPath";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false },
};

/**
 * 404: ne olduğunu söyle, gidilecek yerleri ver. Proje listesi en olası
 * hedef (eski /#projeler bağlantıları, yanlış yazılmış proje adı).
 */
export default function NotFound() {
  return (
    <>
      <main id="main" className="page">
        <div className="wrap reading">
          <RequestedPath />
          <h1 className="page-title">Bu adreste bir sayfa yok</h1>
          <p className="lead">
            Bağlantı eskimiş ya da adres yanlış yazılmış olabilir. Aradığın
            büyük ihtimalle aşağıdaki projelerden biri.
          </p>

          <ul className="nf-list">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projeler/${project.slug}`} className="nf-link">
                  <span>{project.title}</span>
                  <Icon name="arrow-right" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="back">
            <Link href="/" className="text-link">
              <Icon name="arrow-left" />
              Ana sayfa
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
