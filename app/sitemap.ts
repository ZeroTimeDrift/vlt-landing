import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogEntries = posts.map((post) => ({
    url: `https://vlt.money/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        ar: `https://vlt.money/ar/blog/${post.slug}`,
      },
    },
  }));

  const blogEntriesAr = posts.map((post) => ({
    url: `https://vlt.money/ar/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: {
      languages: {
        en: `https://vlt.money/blog/${post.slug}`,
      },
    },
  }));

  return [
    {
      url: "https://vlt.money",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: { ar: "https://vlt.money/ar" } },
    },
    {
      url: "https://vlt.money/ar",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { en: "https://vlt.money" } },
    },
    {
      url: "https://vlt.money/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: { ar: "https://vlt.money/ar/blog" } },
    },
    {
      url: "https://vlt.money/ar/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: { en: "https://vlt.money/blog" } },
    },
    {
      url: "https://vlt.money/partners",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: { ar: "https://vlt.money/ar/partners" } },
    },
    {
      url: "https://vlt.money/ar/partners",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: { en: "https://vlt.money/partners" } },
    },
    {
      url: "https://vlt.money/privacy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: { languages: { ar: "https://vlt.money/ar/privacy" } },
    },
    {
      url: "https://vlt.money/ar/privacy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
      alternates: { languages: { en: "https://vlt.money/privacy" } },
    },
    {
      url: "https://vlt.money/terms",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: { languages: { ar: "https://vlt.money/ar/terms" } },
    },
    {
      url: "https://vlt.money/ar/terms",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
      alternates: { languages: { en: "https://vlt.money/terms" } },
    },
    ...blogEntries,
    ...blogEntriesAr,
  ];
}
