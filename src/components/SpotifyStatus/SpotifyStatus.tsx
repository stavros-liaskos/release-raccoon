'use client';
import clsx from 'clsx/lite';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Paths } from '@/types/endpoints';

import IconTypes from '../Icons/iconTypes';
import LastFm from '../Icons/lastfm';
import Spotify from '../Icons/spotify';

export type MusicServiceType = 'Spotify' | 'LastFm';

const SpotifyStatus = ({
  buttonText,
  musicService,
  iconName,
  connected,
}: {
  buttonText: string;
  musicService: MusicServiceType;
  iconName: MusicServiceType;
  connected: boolean;
}) => {
  const router = useRouter();
  if (!musicService || !buttonText || !iconName) {
    return null;
  }

  async function handleScrape() {
    await fetch(`/api/spotify`, {
      // TODO mv to endpoint
      method: 'GET',
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.warn('data.url: ', data.url);
        router.push(data.url);
      })
      .catch(() => {
        console.log('Scrape failed. Show notification');
      });
  }

  const MusicServiceIcon = getMusicServiceIcon(iconName);

  return (
    <div className="flex justify-center items-center w-full">
      <button
        onClick={() => handleScrape()}
        className={clsx(
          'btn flex justify-between py-2 px-3 w-full md:w-48',
          connected && 'rr-text-confirm! cursor-default!',
        )}
      >
        <MusicServiceIcon width={30} />
        {buttonText}
      </button>
    </div>
  );
};

export function getMusicServiceIcon(iconName: MusicServiceType): React.FunctionComponent<IconTypes> {
  const components = {
    Spotify,
    LastFm,
  };
  return components[iconName];
}

export function getMusicServiceUrl(musicService: MusicServiceType): string {
  switch (musicService) {
    case 'LastFm':
      return Paths.ScrapeLastFM;
    case 'Spotify':
      return Paths.ScrapeSpotify;
    default:
      throw new Error(`Failed to getMusicServicePath for: ${musicService}`);
  }
}

export default SpotifyStatus;
