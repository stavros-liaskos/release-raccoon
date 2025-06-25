import { ReactNode } from 'react';
import { components } from '@/types/schema';

export interface ButtonProps {
  i18n?: string;
  className?: string;
  handleClick?: (...args: number[]) => void;
  handleClickArg?: components['schemas']['SearchResultArtistDto'];
  disabled?: boolean;
  loading?: boolean;
  type?: 'submit' | 'button';
  children?: ReactNode;
}
