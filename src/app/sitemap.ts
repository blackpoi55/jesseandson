import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";

const pages = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/products", priority: 0.9 },
  { path: "/products/men", priority: 0.9 },
  { path: "/products/women", priority: 0.9 },
  { path: "/products/fabrics", priority: 0.8 },
  { path: "/products/shoes", priority: 0.8 },
  { path: "/showroom", priority: 0.8 },
  { path: "/process", priority: 0.8 },
  { path: "/craftsmanship", priority: 0.7 },
  { path: "/testimonials", priority: 0.7 },
  { path: "/pricing", priority: 0.9 },
  { path: "/lookbook", priority: 0.6 },
  { path: "/faq", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/contact", priority: 0.9 },
  { path: "/cookie-policy", priority: 0.2 },
  { path: "/privacy-policy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...pages.map((p) => ({ url: `${site.url}${p.path}`, lastModified: now, priority: p.priority })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
