import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import { getPost, posts } from "@/lib/content";
import { rich } from "@/lib/rich-text";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <main>
        <article className="section" style={{ paddingTop: 160 }}>
          <div className="wrap">
            <p className="post-meta">{post.date}</p>
            <h2 style={{ marginTop: 10 }}>{post.title}</h2>

            <div className="post-body">
              {post.body.map((paragraph, i) => (
                <p key={i}>{rich(paragraph)}</p>
              ))}
            </div>

            <p style={{ marginTop: 34 }}>
              <Link href="/blog" className="back-link">
                ← Tüm yazılar
              </Link>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
