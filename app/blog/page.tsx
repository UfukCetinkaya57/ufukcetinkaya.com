import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import { posts, writing } from "@/lib/content";

export const metadata: Metadata = {
  title: "Yazılar",
  description: writing.body,
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <>
      <main>
        <section className="section" style={{ paddingTop: 160 }}>
          <div className="wrap">
            <div className="sec-eyebrow">{writing.eyebrow}</div>
            <h2>{writing.heading}</h2>

            {posts.length === 0 ? (
              <div className="writing-card" style={{ marginTop: 30 }}>
                <p>{writing.body}</p>
                <span className="kbd">{writing.kbd}</span>
              </div>
            ) : (
              <div className="post-list">
                {posts.map((post) => (
                  <article className="post-item" key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>
                      <h3>{post.title}</h3>
                      <p className="post-meta">{post.date}</p>
                      <p style={{ marginTop: 10 }}>{post.summary}</p>
                    </Link>
                  </article>
                ))}
              </div>
            )}

            <p style={{ marginTop: 34 }}>
              <Link href="/" className="back-link">
                ← Ana sayfa
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
