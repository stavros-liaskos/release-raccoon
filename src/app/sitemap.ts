import type { MetadataRoute } from 'next';

const todayMidnight = new Date();
todayMidnight.setHours(0, 0, 0, 0);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.APP_BASE_URL!,
      lastModified: todayMidnight,
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
