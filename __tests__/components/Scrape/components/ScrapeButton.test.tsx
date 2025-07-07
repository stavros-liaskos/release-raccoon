import { render } from '@testing-library/react';
import React from 'react';

import IconTypes from '@/components/Icons/iconTypes';
import LastFm from '@/components/Icons/lastfm';
import Spotify from '@/components/Icons/spotify';
import ScrapeButton, {
  getMusicServiceIcon,
  getMusicServiceUrl,
  handleScrape,
  MusicServiceType,
} from '@/components/Scrape/components/ScrapeButton';
import { mswScrape } from '@/mocks/mockApi';
import { Paths } from '@/types/endpoints';

import { initServer } from '../../../testUtils/testUtils';

describe('Scrape', () => {
  const server = initServer();

  describe('component', () => {
    it('renders without data without crashing', () => {
      // @ts-ignore
      render(<ScrapeButton />);
    });

    it('scrape button exists', async () => {
      const btnName = 'Scrape Spotify';
      const { findByRole } = render(
        <ScrapeButton iconName={'Spotify'} buttonText={btnName} musicService={'Spotify'} connected={true} />,
      );
      const scrapeBtn = await findByRole('button');

      expect(scrapeBtn).toHaveAttribute('disabled');
      expect(scrapeBtn).toHaveTextContent(btnName);
    });

    it('matches snapshot', () => {
      const { container } = render(
        <ScrapeButton iconName={'Spotify'} buttonText={'Scrape Spotify'} musicService={'Spotify'} connected={true} />,
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

  describe('handleScrape', () => {
    const consoleLogSpy = jest.spyOn(global.console, 'log');
    it('triggers success notification', async () => {
      server.use(mswScrape.success());
      await handleScrape('Spotify');

      expect(consoleLogSpy).toHaveBeenCalledWith('Scraped successfully. Show notification');
    });

    it('triggers error notification', async () => {
      server.use(mswScrape.fail());
      await handleScrape('Spotify');

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
