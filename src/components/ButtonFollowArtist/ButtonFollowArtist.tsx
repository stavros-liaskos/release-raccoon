'use client';
import React, { useCallback } from 'react';
import type { ButtonFollowArtistType } from './ButtonFollowArtist.types';
import followArtist from '../../utils/followArtist';
import Button from '../Button/Button';
import { buttonFollowI18n } from '../../i18n';
import unfollowArtist from '../../utils/unfollowArtists';

const ButtonFollowArtist: React.FunctionComponent<ButtonFollowArtistType> = ({
  disabled = false,
  loading = false,
  artist,
  buttonAction,
}) => {
  const handleClickCallback = useCallback(async () => {
    if (!disabled) {
      buttonAction === 'follow' ? await followArtist(artist) : await unfollowArtist(artist);
    }
  }, [artist, buttonAction, disabled]);

  return (
    <Button
      handleClick={handleClickCallback}
      disabled={disabled}
      loading={loading}
      i18n={buttonAction === 'follow' ? buttonFollowI18n.btnFollow : buttonFollowI18n.btnUnfollow}
    />
  );
};
ButtonFollowArtist.whyDidYouRender = true;
export default ButtonFollowArtist;
