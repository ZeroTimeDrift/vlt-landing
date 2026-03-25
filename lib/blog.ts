import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  readingTime?: string;
  heroImage?: string;
  content?: string;
}

function normalizeDate(raw: unknown): string {
  if (!raw) return "";
  if (raw instanceof Date) {
    return raw.toISOString().slice(0, 10);
  }
  return String(raw);
}

function calcReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

function extractHeroImage(content: string): string | undefined {
  const match = content.match(/!\[.*?\]\((\/blog\/[^)]+)\)/);
  return match ? match[1] : undefined;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((filename) => {
    const filenameSlug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const slug = data.slug ?? filenameSlug;
    return {
      slug,
      title: data.title ?? slug,
      date: normalizeDate(data.date),
      excerpt: data.excerpt ?? data.description ?? "",
      author: data.author,
      readingTime: calcReadingTime(content),
      heroImage: data.heroImage ?? extractHeroImage(content),
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestPosts(n = 3): BlogPost[] {
  return getAllPosts().slice(0, n);
}

export function getPostBySlug(slug: string): BlogPost | null {
  // Try direct filename match first
  const directPath = path.join(BLOG_DIR, `${slug}.md`);
  if (fs.existsSync(directPath)) {
    const raw = fs.readFileSync(directPath, "utf8");
    const { data, content } = matter(raw);
    const html = marked.parse(content) as string;
    return {
      slug: data.slug ?? slug,
      title: data.title ?? slug,
      date: normalizeDate(data.date),
      excerpt: data.excerpt ?? data.description ?? "",
      author: data.author,
      readingTime: calcReadingTime(content),
      heroImage: data.heroImage ?? extractHeroImage(content),
      content: html,
    };
  }
  // Search by frontmatter slug
  if (!fs.existsSync(BLOG_DIR)) return null;
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  for (const filename of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    if (data.slug === slug) {
      const html = marked.parse(content) as string;
      return {
        slug,
        title: data.title ?? slug,
        date: normalizeDate(data.date),
        excerpt: data.excerpt ?? data.description ?? "",
        author: data.author,
        readingTime: calcReadingTime(content),
        heroImage: data.heroImage ?? extractHeroImage(content),
        content: html,
      };
    }
  }
  return null;
}
