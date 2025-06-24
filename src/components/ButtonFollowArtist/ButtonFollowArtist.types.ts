import { components } from '../../types/schema';
import { ButtonProps } from '../Button/Button.types';

export type ButtonFollowArtistType = ButtonProps & {
  artist: components['schemas']['SearchResultArtistDto'];
  buttonAction: ButtonAction;
};

export enum ButtonAction {
  Follow = 'follow',
  Unfollow = 'unfollow',
}
