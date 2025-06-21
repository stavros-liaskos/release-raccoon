import Home from './index.page';
import { resetMocks, renderWithAct, initServer } from '../utils/test-utils';
import { mswAuth, mswFollowedArtists, mswRaccoonUser, mswRecommendedArtists } from '../mocks/mockApi';

describe('Home', () => {
  const server = initServer();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    resetMocks();
    server.use(
      mswAuth.success(),
      mswRecommendedArtists.success(),
      mswFollowedArtists.success(2),
      mswRaccoonUser.success(),
    );
  });

  it('renders a heading', async () => {
    const component = await renderWithAct(<Home />);
    const { container } = component;

    expect(container).toMatchSnapshot();
  });
});
