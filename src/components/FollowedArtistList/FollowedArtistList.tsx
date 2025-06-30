'use client';
import React, { useState } from 'react';

import { useArtistsListContext } from '@/contexts/ArtistsList/ArtistsListContext';
import { followedArtistListI18n } from '@/i18n';
import { components } from '@/types/schema';

import ArtistsList from '../ArtistsList/ArtistsList';
import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';
import FormInput from '../FormInput/FormInput';
import Loading from '../Loading/Loading';

const FollowedArtistList: React.FunctionComponent = () => {
  const { followedArtistList, loading } = useArtistsListContext();
  const [filterInput, setFilterInput] = useState('');

  return (
    <div className="flex flex-col flex-1 items-center mb-2 border-b-2 rr-border w-full">
      <h3 className="h3">{followedArtistListI18n.title}</h3>
      <div className="flex justify-around items-center w-2/3">
        <FormInput
          handleAction={setFilterInput}
          i18n={followedArtistListI18n.formInput}
          actionEventTrigger={'onChange'}
        />
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
  return followedArtistList.filter(followedArtistList => {
    if (inputValue === ' ' || inputValue.length === 1) {
      return true;
    } else {
      return followedArtistList.name.includes(inputValue);
    }
  });
}
