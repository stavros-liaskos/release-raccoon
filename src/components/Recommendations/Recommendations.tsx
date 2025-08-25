import React from 'react';

import { recommendationsI18n } from '@/i18n';
import { getRecommendations } from '@/lib/getRecommendations';

import ArtistsList from '../ArtistsList/ArtistsList';
import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';

const Recommendations = async () => {
  const data = await getRecommendations();
  const recommendedArtists = await data.json();

  return (
    <div className="flex flex-col lg:justify-center items-center mb-2 w-full h-full">
      <h3 className="h3">{recommendationsI18n.title}</h3>

      <ArtistsList
        i18n={recommendationsI18n.artistList}
        artistsList={recommendedArtists?.rows ?? []}
        buttonAction={ButtonAction.Follow}
      />
    </div>
  );
};

export default Recommendations;
