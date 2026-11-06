import type { MetadataRoute } from "next";

import { posts, projects, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${site.url}/projeler/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.6 },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
