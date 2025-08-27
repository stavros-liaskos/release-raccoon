import clsx from 'clsx/lite';
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
  if (!musicService || !buttonText || !iconName) {
    return null;
  }

  const MusicServiceIcon = getMusicServiceIcon(iconName);

  return (
    <div className="flex justify-center items-center w-full md:mb-6">
      <div
        className={clsx('btn flex justify-between py-2 px-3 md:w-48', connected && 'rr-text-confirm! cursor-default!')}
      >
        <MusicServiceIcon width={30} />
        {buttonText}
      </div>
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

export async function handleScrape(musicService: MusicServiceType) {
  await fetch(`${getMusicServiceUrl(musicService)}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(() => {
      console.log('Scraped successfully. Show notification');
    })
    .catch(() => {
      console.log('Scrape failed. Show notification');
    });
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
