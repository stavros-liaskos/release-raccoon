'use client';
import React, { useCallback } from 'react';

import followArtist from '@/utils/followArtist';

import Spin from '../Icons/spin';
import { ButtonProps } from './Button.types';

const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  i18n,
  handleClick = () => {},
  disabled = false,
  loading = false,
  type = 'button',
  handleClickArg,
  children,
}) => {
  const handleClickCallback = useCallback(async () => {
    if (!disabled) {
      // fix duplication of logic with ButtonFollowArtist
      handleClickArg ? await followArtist(handleClickArg) : handleClick();
    }
  }, [handleClick, handleClickArg, disabled]);

  if (!i18n && !children) {
    return null;
  }

  return (
    <button
      className={`btn flex ${className ? className : ''}`}
      onClick={handleClickCallback}
      disabled={disabled}
      type={type}
    >
      {loading && (
        <span className="flex justify-center items-center -ml-1 mr-3 h-5 w-5">
          <Spin width={20} />
        </span>
      )}
      {i18n}
      {children}
    </button>
  );
};
export default Button;
