import { MetadataRoute } from "next";

export function getUrls(): MetadataRoute.Sitemap {
  const appUrl = process.env.APP_URL!;
  const lastModified = new Date().toISOString();

  return [
    {
      url: appUrl,
      lastModified,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${appUrl}/sign-in`,
      lastModified,
      changeFrequency: "never",
      priority: 0.9,
    },
    {
      url: `${appUrl}/sign-up`,
      lastModified,
      changeFrequency: "never",
      priority: 0.9,
    },
  ];
}
