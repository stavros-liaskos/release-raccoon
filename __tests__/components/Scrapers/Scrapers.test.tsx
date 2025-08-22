import Scrapers from '@/components/Scrapers/Scrapers';
import { mswFollowedArtists, mswRaccoonUser } from '@/mocks/mockApi';

import { initServer, renderWithAct, resetMocks } from '../../testUtils/testUtils';

xdescribe('Scrapers', () => {
  const server = initServer();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    resetMocks();
    server.use(mswFollowedArtists.success(2), mswRaccoonUser.success());
  });

  it('loads spotify in "Scraped" state and lastfm in "Not scraped"', async () => {
    const { findAllByRole } = await renderWithAct(<Scrapers />);

    expect(await findAllByRole('img')).toHaveLength(2);
  });

  it('matches snapshot', async () => {
    const { container } = await renderWithAct(<Scrapers />);

    expect(container).toMatchSnapshot();
  });
});
