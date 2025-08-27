'use client';
import React, { useEffect } from 'react';

import RecommendationsSkeleton from '@/components/Recommendations/RecommendationsSkeleton/RecommendationsSkeleton';
import { recommendationsI18n } from '@/i18n';
import { Paths } from '@/types/endpoints';
import { components } from '@/types/schema';

import ArtistsList from '../ArtistsList/ArtistsList';
import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';

const Recommendations = () => {
  const [loading, setLoading] = React.useState(true);
  const [recommendedArtists, setRecommendedArtists] = React.useState<components['schemas']['SearchResultArtistDto'][]>(
    [],
  );

  useEffect(() => {
    fetch(`${Paths.Recommended}`, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
    })
      .then(data => data.json())
      .then(setRecommendedArtists)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <RecommendationsSkeleton />;
  }

  return (
    <>
      <h3 className="h3">{recommendationsI18n.title}</h3>

      <ArtistsList
        i18n={recommendationsI18n.artistList}
        artistsList={recommendedArtists}
        buttonAction={ButtonAction.Follow}
      />
    </>
  );
};

export default Recommendations;
