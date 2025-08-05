import type { Metadata, Viewport } from 'next';
import React from 'react';

import Hero from '@/components/Hero/Hero';
import { metaI18n } from '@/i18n';

// migrate metadata to app router
export const metadata: Metadata = {
  title: metaI18n.title,
  description: metaI18n.description,
};
export const viewport: Viewport = {
  themeColor: '#000000',
};

export default async function Page() {
  return <Hero />;
}
