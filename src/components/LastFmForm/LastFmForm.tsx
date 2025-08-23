'use client';

import React from 'react';

import Button from '@/components/Button/Button';
import { useUserContext } from '@/contexts/User/UserContext';
import { lastFmFormI18n } from '@/i18n';
import { Paths } from '@/types/endpoints';

export default function LastFmForm() {
  const { rrUser } = useUserContext();
  const [loading, setLoading] = React.useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e?.currentTarget?.username?.value;

    if (!username) {
      console.error('Username is required');
      return;
    }

    setLoading(true);
    await fetch(`/${Paths.ScrapeLastFM}?email=${username}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(() => {
        console.log('Connected to LastFm');
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-40 opacity-100">
          <form onSubmit={handleFormSubmit} className="flex gap-4 p-4 bg-card text-card-foreground">
            <label htmlFor="username" className="sr-only">
              {lastFmFormI18n.label}
            </label>
            <input className="mr-4 rr-input  w-64" id="username" placeholder={lastFmFormI18n.placeholder} required />
            <Button className="btn-large" loading={loading} type="submit">
              {lastFmFormI18n.submitBtn}
            </Button>
          </form>
          {rrUser?.lastfmUsername && (
            <p className="rr-text">{lastFmFormI18n.syncedMsg + ' ' + rrUser.lastfmUsername}</p>
          )}
        </div>
      </div>
    </div>
  );
}
