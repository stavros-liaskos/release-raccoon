'use client';
import React, { useState } from 'react';

import FormInput from '@/components/FollowedArtistList/FormInput';
import { useArtistsListContext } from '@/contexts/ArtistsList/ArtistsListContext';
import { followedArtistListI18n } from '@/i18n';
import { components } from '@/types/schema';

import ArtistsList from '../ArtistsList/ArtistsList';
import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';
import Loading from '../Loading/Loading';

const FollowedArtistList: React.FunctionComponent = () => {
  const { followedArtistList, loading } = useArtistsListContext();
  const [filterInput, setFilterInput] = useState('');

  return (
    <div className="flex flex-col flex-1 items-center mb-2 rr-border w-full h-full">
      <div className="flex justify-around items-center w-2/3">
        <FormInput handleAction={setFilterInput} i18n={followedArtistListI18n.formInput} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <ArtistsList
          i18n={followedArtistListI18n.artistList}
          artistsList={filterArtists(followedArtistList, filterInput)}
          buttonAction={ButtonAction.Unfollow}
        />
      )}
    </div>
  );
};

export default FollowedArtistList;

export function filterArtists(
  followedArtistList: components['schemas']['ArtistDto'][],
  inputValue: string = '',
): components['schemas']['ArtistDto'][] {
  if (!inputValue || inputValue.trim() === '') {
    return followedArtistList;
  }

  return followedArtistList.filter(followedArtistList =>
    followedArtistList.name.toLowerCase().includes(inputValue.toLowerCase()),
  );
}
