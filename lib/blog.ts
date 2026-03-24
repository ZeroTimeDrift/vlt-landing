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
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ? String(data.date) : "",
      excerpt: data.excerpt ?? data.description ?? "",
      author: data.author,
      readingTime: calcReadingTime(content),
      heroImage: extractHeroImage(content),
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestPosts(n = 3): BlogPost[] {
  return getAllPosts().slice(0, n);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content) as string;
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? String(data.date) : "",
    excerpt: data.excerpt ?? "",
    author: data.author,
    readingTime: calcReadingTime(content),
    heroImage: extractHeroImage(content),
    content: html,
  };
}
