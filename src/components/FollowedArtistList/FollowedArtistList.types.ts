import { ArtistsListI18n } from '../ArtistsList/ArtistsList';

export type ListI18n = {
  title: string;
  filter: string;
  artistList: ArtistsListI18n;
  formInput: {
    label: string;
  };
};

export type ListProps = {
  i18n: ListI18n;
};
