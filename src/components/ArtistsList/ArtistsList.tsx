import React from 'react';

import { components } from '@/types/schema';

import { ButtonAction } from '../ButtonFollowArtist/ButtonFollowArtist.types';
import List from './components/List/List';

export type ArtistsListI18n = {
  noArtists: string;
};

export type ArtistsListProp = {
  artistsList: components['schemas']['SearchResultArtistDto'][];
  buttonAction: ButtonAction;
  i18n?: ArtistsListI18n;
};

const ArtistsList = ({ i18n, artistsList, buttonAction }: ArtistsListProp) => {
  if (!i18n?.noArtists || !buttonAction) {
    return null;
  }
  return (
    <div className="overflow-x-hidden w-full h-150">
      {!artistsList?.length ? (
        <p className="rr-text flex justify-center">{i18n.noArtists}</p>
      ) : (
        <List artistsList={artistsList} buttonAction={buttonAction} />
      )}
    </div>
  );
};

export default ArtistsList;
