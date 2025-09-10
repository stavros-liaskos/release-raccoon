import React from 'react';

import Loading from '@/components/Loading/Loading';

export default function ArtistListSkeleton() {
  return (
    <div className="flex flex-col lg:justify-center items-center mb-2 w-full min-h-[474px]">
      <Loading />
    </div>
  );
}
