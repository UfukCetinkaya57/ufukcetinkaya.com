import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
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
      <main id="main" className="page">
        <article className="wrap reading">
          <p className="post-meta">
            <time dateTime={post.date}>{post.date}</time>
          </p>
          <h1 className="page-title">{post.title}</h1>

          <div className="prose post-body">
            {post.body.map((paragraph, i) => (
              <p key={i}>{rich(paragraph)}</p>
            ))}
          </div>

          <p className="back">
            <Link href="/blog" className="text-link">
              <Icon name="arrow-left" />
              Tüm yazılar
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
