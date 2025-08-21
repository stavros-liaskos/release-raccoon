import { Suspense } from 'react';

import SpotifyCallback from '@/components/SpotifyCallback/SpotifyCallback';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SpotifyCallback />
      </Suspense>
    </div>
  );
}
