import Scrapers from './Scrapers';
import { resetMocks, renderWithAct, initServer } from '../../utils/test-utils';
import { mswAuth, mswFollowedArtists, mswRaccoonUser } from '../../mocks/mockApi';

describe('Scrapers', () => {
  const server = initServer();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    resetMocks();
    server.use(mswFollowedArtists.success(2), mswAuth.success(), mswRaccoonUser.success());
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
