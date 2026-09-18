import type { NextConfig } from "next";

/**
 * Old site URLs (jesseandson.com) mapped to the new structure so existing
 * Google rankings and bookmarks keep working. Blog slugs are unchanged.
 */
const legacyRedirects = [
  { source: "/product", destination: "/products" },
  { source: "/product/fabrics", destination: "/products/fabrics" },
  { source: "/product/men", destination: "/products/men" },
  { source: "/product/women", destination: "/products/women" },
  { source: "/product/shoe", destination: "/products/shoes" },
  { source: "/inspiration", destination: "/lookbook" },
  { source: "/cookie_policy", destination: "/cookie-policy" },
  { source: "/privacy_policy", destination: "/privacy-policy" },
  { source: "/blog/detail/:path*", destination: "/blog" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    return [
      ...legacyRedirects.map((r) => ({ ...r, permanent: true })),
      {
        source: "/howitworks",
        has: [{ type: "query", key: "id", value: "2" }],
        destination: "/craftsmanship",
        permanent: true,
      },
      { source: "/howitworks", destination: "/process", permanent: true },
    ];
  },
};

export default nextConfig;
