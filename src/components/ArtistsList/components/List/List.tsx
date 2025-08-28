'use client';

import './List.css';

import clsx from 'clsx/lite';
import React, { useState } from 'react';

import Badge from '@/components/Badge/Badge';
import ButtonFollowArtist from '@/components/ButtonFollowArtist/ButtonFollowArtist';
import LastFm from '@/components/Icons/lastfm';
import Spotify from '@/components/Icons/spotify';
import { listI18n } from '@/i18n';

import { ArtistsListProp } from '../../ArtistsList';

const ICON_SIZE = 30;

const List = ({ artistsList, buttonAction }: ArtistsListProp) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  if (!artistsList?.length || !buttonAction) {
    return null;
  }

  const handleRowClick = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <>
      {artistsList.map((artist, index: number) => {
        const followerCount = artist?.followerCount;
        const isExpanded = expandedRow === index;

        return (
          <div
            className="flex justify-between items-center dark:even:bg-gh-darkly even:bg-gray-100 h-12"
            key={artist.id ?? index}
          >
            <button
              className="grow overflow-text-hide rr-text text-left cursor-pointer xs:cursor-default"
              onClick={() => handleRowClick(index)}
            >
              {artist.name}
            </button>

            <div className={clsx('flex items-center gap-2 artist-details', isExpanded && 'expanded')}>
              {!!followerCount && (
                <Badge className={clsx(index % 2 ? 'dark:bg-gh-dark bg-white' : 'bg-gray-100 dark:bg-gh-darkly')}>
                  <span>{followerCount}</span>
                  <span className="ml-2">{followerCount > 1 ? listI18n.followers : listI18n.follower}</span>
                </Badge>
              )}
              <div className="flex gap-2 md:mx-8 w-18">
                {artist.lastfmUri && (
                  <a className="inline" href={artist.lastfmUri} aria-label={artist.name}>
                    <LastFm width={ICON_SIZE} />
                  </a>
                )}
                {artist.spotifyUri && (
                  <a className="inline" href={artist.spotifyUri} aria-label={artist.name}>
                    <Spotify width={ICON_SIZE} />
                  </a>
                )}
              </div>
              <ButtonFollowArtist
                artist={artist}
                className={clsx('btn-small lg:ml-8 my-2', index % 2 && 'border-gh-dark!')}
                buttonAction={buttonAction}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default List;
