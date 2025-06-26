import '../scripts/wdyr';

import type { Metadata, Viewport } from 'next';
import React from 'react';

import { loginI18n, metaI18n, searchI18n } from '@/i18n';

import FollowedArtistList from '../components/FollowedArtistList/FollowedArtistList';
import Login from '../components/Login/Login';
import Recommendations from '../components/Recommendations/Recommendations';
import Scrapers from '../components/Scrape/Scrapers';
import Search from '../components/Search/Search';
import ArtistsListProvider from '../contexts/ArtistsList/ArtistsListProvider';
import { auth0 } from '../lib/auth0';

// migrate metadata to app router
export const metadata: Metadata = {
  title: metaI18n.title,
  description: metaI18n.description,
};
export const viewport: Viewport = {
  themeColor: '#000000',
};

export default async function Page() {
  const session = await auth0.getSession();

  if (!session) {
    return <Login i18n={loginI18n} />;
  }
  return (
    <ArtistsListProvider>
      <Search i18n={searchI18n} />
      {session?.user?.email && <Scrapers userEmail={session.user.email} />}
      <div className="flex flex-auto flex-col h24">
        <FollowedArtistList />
        <Recommendations />
      </div>
    </ArtistsListProvider>
  );
}
