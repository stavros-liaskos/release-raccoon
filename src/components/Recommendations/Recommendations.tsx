import React, { Suspense } from 'react';

import Loading from '@/components/Loading/Loading';
import { recommendationsI18n } from '@/i18n';
import { Paths } from '@/types/endpoints';

import ArtistsList from '../ArtistsList/ArtistsList';
import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';

const Recommendations = async () => {
  const data = await fetch(`${process.env.APP_BASE_URL}/${Paths.Recommended}?page=1&size=10`);
  const recommendedArtists = await data.json();

  return (
    <div className="flex flex-col lg:justify-center items-center mb-2 w-full">
      <h3 className={'h3'}>{recommendationsI18n.title}</h3>

      <Suspense fallback={<Loading />}>
        <ArtistsList
          i18n={recommendationsI18n.artistList}
          artistsList={recommendedArtists?.rows ?? []}
          buttonAction={ButtonAction.Follow}
        />
      </Suspense>
    </div>
  );
};

Recommendations.whyDidYouRender = true;
export default Recommendations;
