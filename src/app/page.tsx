import '../scripts/wdyr';
import type { Metadata, Viewport } from 'next';
import { followedArtistListI18n, loginI18n, metaI18n, recommendationsI18n, searchI18n } from '../i18n';
import { auth0 } from '../lib/auth0';
import Login from '../components/Login/Login';
import React from 'react';
import Search from '../components/Search/Search';
import Scrapers from '../components/Scrape/Scrapers';
import FollowedArtistList from '../components/FollowedArtistList/FollowedArtistList';
import ArtistsListProvider from '../contexts/ArtistsList/ArtistsListProvider';
import Recommendations from '../components/Recommendations/Recommendations';

// TODO migrate metadata to app router
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
        <FollowedArtistList i18n={followedArtistListI18n} />
        <Recommendations i18n={recommendationsI18n} />
      </div>
    </ArtistsListProvider>
  );
}
