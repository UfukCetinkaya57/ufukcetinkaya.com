import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { posts, writing } from "@/lib/content";

export const metadata: Metadata = {
  title: "Yazılar",
  description: writing.body,
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <>
      <main id="main" className="page">
        <div className="wrap reading">
          <h1 className="page-title">{writing.heading}</h1>

          {posts.length === 0 ? (
            // Boş durum: ne olduğunu ve sıradaki adımı söyle.
            <div className="empty">
              <p className="lead">{writing.body}</p>
              <p className="after-lead">
                Şimdilik projelerin teknik dökümlerine{" "}
                <Link href="/#work" className="inline-link">
                  ana sayfadan
                </Link>{" "}
                bakabilirsin.
              </p>
            </div>
          ) : (
            <ol className="post-list">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="post-link">
                    <h2>{post.title}</h2>
                    <p className="post-summary">{post.summary}</p>
                    <p className="post-meta">
                      <time dateTime={post.date}>{post.date}</time>
                    </p>
                  </Link>
                </li>
              ))}
            </ol>
          )}

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
