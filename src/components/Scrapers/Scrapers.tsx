'use client';
import React from 'react';

import LastFmForm from '@/components/LastFmForm/LastFmForm';
import SpotifyStatus from '@/components/SpotifyStatus/SpotifyStatus';
import { useUserContext } from '@/contexts/User/UserContext';
import { scrapersI18n } from '@/i18n';

const Scrapers = () => {
  const { rrUser } = useUserContext();

  return (
    <div className="rr-border border-b-2 py-6">
      <h2 className="rr-text text-center text-2xl mb-3">{scrapersI18n.title}</h2>

      <div className="flex flex-col lg:justify-center md:flex-row flex-none gap-2 my-2 md:my-5 w-full">
        <SpotifyStatus
          buttonText={rrUser.spotifyEnabled ? scrapersI18n.connected : scrapersI18n.connect}
          connected={rrUser.spotifyEnabled}
        />
        <LastFmForm />
      </div>
    </div>
  );
};

export default Scrapers;
