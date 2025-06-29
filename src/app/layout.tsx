import '../styles/globals.css';

import React from 'react';

import { interFonts } from '@/styles/fonts';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ThemeProvider from '../contexts/Theme/ThemeProvider';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${interFonts.className} antialiased bg-white dark:bg-gh-dark`}>
        <div className="container max-auto">
          <div className="sm:border-x-2 rr-border flex flex-col h-screen">
            <Header />

            <main className="rr-column flex-auto">
              <div className="flex flex-col flex-auto w-full lg:w-9/12">
                <ThemeProvider>{children}</ThemeProvider>
              </div>
            </main>

            <Footer />
          </div>
        </div>
        {/*<Script src="/noflash.js" strategy={'beforeInteractive'} />*/}
      </body>
    </html>
  );
}
