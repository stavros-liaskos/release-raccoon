'use client';
import React, { useEffect, useRef, useState } from 'react';

import { scrapersI18n } from '@/i18n';
import { Paths } from '@/types/endpoints';
import { components } from '@/types/schema';

import ScrapeButton from './components/ScrapeButton';

const Scrapers = ({ userEmail }: { userEmail: string }) => {
  const [scrapers, setScrapers] = useState<{ spotify: boolean; lastfm: boolean }>({ spotify: false, lastfm: false });
  const areScrapersInitialised = useRef(false);

  useEffect(() => {
    !areScrapersInitialised.current &&
      userEmail &&
      fetch(`${Paths.RaccoonUser}?email=${userEmail}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then(res => res.json())
        .then((raccoonUser: components['schemas']['RaccoonUser'][]) => {
          const isLastFmConnected = !!raccoonUser?.[0]?.lastfmUsername;
          const isSpotifyConnected = !!raccoonUser?.[0]?.spotifyEnabled;
          if (scrapers.spotify !== isSpotifyConnected || scrapers.lastfm !== isLastFmConnected) {
            setScrapers({ spotify: isSpotifyConnected, lastfm: isLastFmConnected });
            areScrapersInitialised.current = true;
          }
        })
        .catch(console.error);
  }, [scrapers.lastfm, scrapers.spotify, userEmail]);

  return (
    <div className="flex lg:justify-center flex-none gap-2 my-2 md:my-5 w-full">
      <ScrapeButton
        buttonText={scrapers.spotify ? scrapersI18n.connected : scrapersI18n.connect}
        musicService={'Spotify'}
        iconName={'Spotify'}
        connected={scrapers.spotify}
      />
      <ScrapeButton
        buttonText={scrapers.lastfm ? scrapersI18n.connected : scrapersI18n.connect}
        musicService={'LastFm'}
        iconName={'LastFm'}
        connected={scrapers.lastfm}
      />
    </div>
  );
};

export default Scrapers;
