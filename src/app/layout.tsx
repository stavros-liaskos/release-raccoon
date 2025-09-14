import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import React from 'react';

import { metaI18n } from '@/i18n';
import { interFonts } from '@/styles/fonts';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ThemeProvider from '../contexts/Theme/ThemeProvider';

// migrate metadata to app router
export const metadata: Metadata = {
  title: metaI18n.title,
  description: metaI18n.description,
};
export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${interFonts.className} antialiased bg-white dark:bg-gh-dark`}>
        <ThemeProvider>
          <div className="container max-auto">
            <div className="sm:border-x-2 rr-border flex flex-col h-screen">
              <Header />

              <main className="rr-column flex-auto max-h-full overflow-y-auto">
                <div className="flex flex-col flex-auto w-full lg:w-9/12">{children}</div>
              </main>

              <Footer />
            </div>
          </div>
        </ThemeProvider>
        {/*<Script src="/noflash.js" strategy={'beforeInteractive'} />*/}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
