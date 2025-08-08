'use client';
import React from 'react';

import { useUserContext } from '@/contexts/User/UserContext';
import { scrapersI18n } from '@/i18n';

import ScrapeButton from './components/ScrapeButton';

const Scrapers = () => {
  const { rrUser } = useUserContext();

  return (
    <div className="flex lg:justify-center flex-none gap-2 my-2 md:my-5 w-full">
      <ScrapeButton
        buttonText={rrUser.spotify ? scrapersI18n.connected : scrapersI18n.connect}
        musicService={'Spotify'}
        iconName={'Spotify'}
        connected={rrUser.spotify}
      />
      <ScrapeButton
        buttonText={rrUser.lastfm ? scrapersI18n.connected : scrapersI18n.connect}
        musicService={'LastFm'}
        iconName={'LastFm'}
        connected={rrUser.lastfm}
      />
    </div>
  );
};

export default Scrapers;
