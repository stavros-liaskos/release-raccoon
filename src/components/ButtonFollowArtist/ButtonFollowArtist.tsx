'use client';
import React, { useCallback } from 'react';

import { useArtistsListContext } from '@/contexts/ArtistsList/ArtistsListContext';
import { useSearchContext } from '@/contexts/Search/SearchContext';
import { buttonFollowI18n } from '@/i18n';
import { components } from '@/types/schema';
import followArtist from '@/utils/followArtist';
import unfollowArtist from '@/utils/unfollowArtists';

import Button from '../Button/Button';
import { ButtonAction, ButtonFollowArtistType } from './ButtonFollowArtist.types';

const ButtonFollowArtist: React.FunctionComponent<ButtonFollowArtistType> = ({
  disabled = false,
  loading = false,
  artist,
  buttonAction,
  className,
}) => {
  const { memoryArtistListUpdate } = useArtistsListContext();
  const { closeSearchResults } = useSearchContext();

  const handleClickCallback = useCallback(async () => {
    if (disabled) return;

    try {
      if (buttonAction === ButtonAction.Follow) {
        await followArtist(artist);
        closeSearchResults();
      } else {
        await unfollowArtist(artist);
      }

      memoryArtistListUpdate(artist as components['schemas']['ArtistDto'], buttonAction);
    } catch (error) {
      console.error(error);
    }
  }, [artist, buttonAction, disabled, memoryArtistListUpdate, closeSearchResults]);

  return (
    <Button
      className={className}
      handleClick={handleClickCallback}
      disabled={disabled}
      loading={loading}
      i18n={buttonAction === ButtonAction.Follow ? buttonFollowI18n.btnFollow : buttonFollowI18n.btnUnfollow}
    />
  );
};
export default ButtonFollowArtist;
