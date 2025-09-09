'use client';

import './List.css';

import clsx from 'clsx/lite';
import React, { useState } from 'react';

import Badge from '@/components/Badge/Badge';
import ButtonFollowArtist from '@/components/ButtonFollowArtist/ButtonFollowArtist';
import { ButtonAction } from '@/components/ButtonFollowArtist/ButtonFollowArtist.types';
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
              aria-label={`View details for ${artist.name}`}
              className="grow overflow-text-hide rr-text text-left cursor-pointer sm:cursor-default h-full"
              onClick={() => handleRowClick(index)}
            >
              {artist.name}
            </button>

            <div className={clsx('artist-details-wrapper', isExpanded && 'expanded')}>
              <div className="flex items-center gap-2">
                {!!followerCount && (
                  <Badge className={clsx(index % 2 ? 'dark:bg-gh-dark bg-white' : 'bg-gray-100 dark:bg-gh-darkly')}>
                    <span>{followerCount}</span>
                    <span className="ml-2">{followerCount > 1 ? listI18n.followers : listI18n.follower}</span>
                  </Badge>
                )}
                <div className="flex gap-2 sm:w-18">
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
                  buttonAction={getButtonAction(buttonAction, artist?.followedByUser)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

function getButtonAction(buttonAction: ButtonAction, followedByUser?: boolean) {
  if (typeof followedByUser === 'boolean') {
    return followedByUser ? ButtonAction.Unfollow : ButtonAction.Follow;
  }
  return buttonAction;
}

export default List;
