import React from 'react';

import { Paths } from '@/types/endpoints';

import Button from '../../Button/Button';
import IconTypes from '../../Icons/iconTypes';
import LastFm from '../../Icons/lastfm';
import Spotify from '../../Icons/spotify';

export type MusicServiceType = 'Spotify' | 'LastFm';

const ScrapeButton = ({
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
    <div className="flex justify-center items-center w-full">
      <Button
        className={`flex justify-between py-2 px-3 w-full md:w-48${connected ? ' rr-text-confirm!' : ''}`}
        i18n={buttonText}
        handleClick={() => handleScrape(musicService)}
        disabled={connected}
      >
        <MusicServiceIcon width={30} />
      </Button>
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

export default ScrapeButton;
