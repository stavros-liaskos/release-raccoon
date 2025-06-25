import Scrapers from './Scrapers';
import { resetMocks, renderWithAct, initServer } from '../../utils/test-utils';
import { mswFollowedArtists, mswRaccoonUser } from '../../mocks/mockApi';

describe('Scrapers', () => {
  const server = initServer();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    resetMocks();
    server.use(mswFollowedArtists.success(2), mswRaccoonUser.success());
  });

  it('loads spotify in "Scraped" state and lastfm in "Not scraped"', async () => {
    const { findAllByRole } = await renderWithAct(<Scrapers userEmail={'johnny.doe@acme.com'} />);

    expect(await findAllByRole('img')).toHaveLength(2);
  });

  it('matches snapshot', async () => {
    const { container } = await renderWithAct(<Scrapers userEmail={'johnny.doe@acme.com'} />);

    expect(container).toMatchSnapshot();
  });
});
