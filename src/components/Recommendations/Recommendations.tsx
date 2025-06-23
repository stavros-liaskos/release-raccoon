import ArtistsList, { ArtistsListI18n } from '../ArtistsList/ArtistsList';
import React, { Suspense } from 'react';
import { Paths } from '../../types/endpoints';
import Loading from '../Loading/Loading';

type RecommendationsI18n = {
  title: string;
  artistList: ArtistsListI18n;
};

const Recommendations = async ({ i18n }: { i18n: RecommendationsI18n }) => {
  if (!i18n || !i18n.title) {
    return null;
  }

  const data = await fetch(`${process.env.APP_BASE_URL}/${Paths.Recommended}?page=1&size=10`, { cache: 'no-store' });
  const recommendedArtists = await data.json();

  return (
    <div className="flex flex-col lg:justify-center items-center mb-2 w-full">
      <h3 className={'h3'}>{i18n.title}</h3>

      <Suspense fallback={<Loading />}>
        <ArtistsList i18n={i18n.artistList} artistsList={recommendedArtists?.rows ?? []} buttonAction={'follow'} />
      </Suspense>
    </div>
  );
};

Recommendations.whyDidYouRender = true;
export default Recommendations;
