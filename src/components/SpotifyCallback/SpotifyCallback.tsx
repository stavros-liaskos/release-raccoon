'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { Paths } from '@/types/endpoints';

export default function SpotifyCallback() {
  const [loading, setLoading] = React.useState(true);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    fetch(`/${Paths.SpotifyCode}`, {
      method: 'POST',
      body: JSON.stringify({
        code,
      }),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [code]);

  return (
    <div>
      <p>Spotify</p>
      {loading && <p>Connecting...</p>}
    </div>
  );
}
