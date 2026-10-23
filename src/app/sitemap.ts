import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://kobo.howardotuya.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/app`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
