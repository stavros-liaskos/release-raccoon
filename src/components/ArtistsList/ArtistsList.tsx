import { components } from '../../types/schema';
import React from 'react';
import List from './components/List/List';
import { artistsListI18n } from '../../i18n';

export type ArtistsListI18n = {
  noArtists: string;
};

export type ArtistsListProp = {
  artistsList: components['schemas']['SearchResultArtistDto'][];
  artistLoading?: number;
  buttonAction: 'follow' | 'unfollow';
};

const ArtistsList = ({ artistsList, artistLoading, buttonAction }: ArtistsListProp) => {
  return (
    <div className="overflow-auto w-full flex-auto h-64">
      {!artistsList?.length ? (
        <p className="rr-text flex justify-center">{artistsListI18n.noArtists}</p>
      ) : (
        <List artistsList={artistsList} artistLoading={artistLoading} buttonAction={buttonAction} />
      )}
    </div>
  );
};

export default ArtistsList;
