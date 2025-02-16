// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Scrapers from './Scrapers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  it.todo('do');
  // it('loads spotify in "Scraped" state and lastfm in "Not scraped"', async () => {
  //   const { findAllByRole } = await renderWithAct(<Scrapers />);
  //
  //   expect(await findAllByRole('img')).toHaveLength(2);
  // });
  //
  // it('matches snapshot', async () => {
  //   const { container } = await renderWithAct(<Scrapers />);
  //
  //   expect(container).toMatchSnapshot();
  // });
});
