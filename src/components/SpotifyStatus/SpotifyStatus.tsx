'use client';
import clsx from 'clsx/lite';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Paths } from '@/types/endpoints';

import Spotify from '../Icons/spotify';

const SpotifyStatus = ({ buttonText, connected }: { buttonText: string; connected: boolean }) => {
  const router = useRouter();
  if (!buttonText) {
    return null;
  }

  async function handleScrape() {
    await fetch(`/${Paths.SpotifyCode}`, {
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

  return (
    <div className="flex justify-center items-center w-full md:mb-6">
      <button
        onClick={() => handleScrape()}
        className={clsx('btn flex justify-between py-2 px-3 md:w-48', connected && 'rr-text-confirm! cursor-default!')}
        disabled={connected}
      >
        <Spotify width={30} />
        {buttonText}
      </button>
    </div>
  );
};

export default SpotifyStatus;
