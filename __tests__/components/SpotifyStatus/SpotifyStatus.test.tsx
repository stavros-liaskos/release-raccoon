import { render } from '@testing-library/react';
import React from 'react';

import IconTypes from '@/components/Icons/iconTypes';
import LastFm from '@/components/Icons/lastfm';
import Spotify from '@/components/Icons/spotify';
import SpotifyStatus, {
  getMusicServiceIcon,
  getMusicServiceUrl,
  MusicServiceType,
} from '@/components/SpotifyStatus/SpotifyStatus';
import { mswScrape } from '@/mocks/mockApi';
import { Paths } from '@/types/endpoints';

import { initServer } from '../../testUtils/testUtils';

describe('SpotifyStatus', () => {
  const server = initServer();

  describe('component', () => {
    it('renders without data without crashing', () => {
      // @ts-ignore
      render(<SpotifyStatus />);
    });

    it('scrape button exists', async () => {
      const btnName = 'Scrape Spotify';
      const { findByText } = render(
        <SpotifyStatus iconName={'Spotify'} buttonText={btnName} musicService={'Spotify'} connected={true} />,
      );
      const scrapeBtn = await findByText('Scrape Spotify');

      expect(scrapeBtn).toHaveTextContent(btnName);
    });

    it('matches snapshot', () => {
      const { container } = render(
        <SpotifyStatus iconName={'Spotify'} buttonText={'Scrape Spotify'} musicService={'Spotify'} connected={true} />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('getMusicServiceIcon', () => {
    it.each<{ iconName: MusicServiceType; component: React.FunctionComponent<IconTypes> }>([
      { iconName: 'Spotify', component: Spotify },
      { iconName: 'LastFm', component: LastFm },
    ])('returns React Icon Component', ({ iconName, component }) => {
      expect(getMusicServiceIcon(iconName)).toBe(component);
    });
  });

  xdescribe('handleScrape', () => {
    const consoleLogSpy = jest.spyOn(global.console, 'log');
    it('triggers success notification', async () => {
      server.use(mswScrape.success());

      expect(consoleLogSpy).toHaveBeenCalledWith('Scraped successfully. Show notification');
    });

    it('triggers error notification', async () => {
      server.use(mswScrape.fail());

      expect(consoleLogSpy).toHaveBeenCalledWith('Scrape failed. Show notification');
    });
  });

  describe('getMusicServicePath', () => {
    it.each<{ musicService: MusicServiceType; path: string }>([
      { musicService: 'LastFm', path: 'ScrapeLastFM' },
      { musicService: 'Spotify', path: 'ScrapeSpotify' },
    ])('returns correct path', ({ musicService, path }) => {
      expect(getMusicServiceUrl(musicService)).toBe(Paths[path]);
    });

    it('throws error when music service does not match', () => {
      expect(() => getMusicServiceUrl('UndefinedFM' as MusicServiceType)).toThrow(
        'Failed to getMusicServicePath for: UndefinedFM',
      );
    });
  });
});
