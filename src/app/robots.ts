import type { MetadataRoute } from 'next';

import { NavigationPaths } from '@/types/endpoints';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: `/${NavigationPaths.Profile}/*`,
    },
    sitemap: `${process.env.APP_BASE_URL}/sitemap.xml`,
  };
}
