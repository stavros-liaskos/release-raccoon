'use client';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const { user } = useUser();

  const handleClickCallback = useCallback(async () => {
    if (disabled) return;

    // user session expired, redirect to login page
    if (!user?.email) {
      router.push('/');
    }

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
  }, [disabled, user?.email, router, buttonAction, memoryArtistListUpdate, artist, closeSearchResults]);

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
