import type { MetadataRoute } from 'next';

import { metaI18n } from '@/i18n';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: metaI18n.title,
    short_name: metaI18n.short_name,
    description: metaI18n.description,
    start_url: metaI18n.url,
    display: 'standalone',
    prefer_related_applications: false,
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: './app_icons/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: './app_icons/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
