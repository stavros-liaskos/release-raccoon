import { render } from '@testing-library/react';
import React from 'react';

import SpotifyStatus from '@/components/SpotifyStatus/SpotifyStatus';
import { mswScrape } from '@/mocks/mockApi';

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
      const { findByText } = render(<SpotifyStatus buttonText={btnName} connected={true} />);
      const scrapeBtn = await findByText('Scrape Spotify');

      expect(scrapeBtn).toHaveTextContent(btnName);
    });

    it('matches snapshot', () => {
      const { container } = render(<SpotifyStatus buttonText={'Scrape Spotify'} connected={true} />);
      expect(container).toMatchSnapshot();
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
});
