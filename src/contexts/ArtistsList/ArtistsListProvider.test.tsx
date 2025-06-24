import { useArtistsListContext } from './ArtistsListContext';
import { resetMocks, renderWithAct, initServer } from '../../utils/test-utils';
import { mswFollowedArtists } from '../../mocks/mockApi';

describe('ArtistsListContext', () => {
  const server = initServer();

  beforeEach(() => {
    resetMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const ArtistList = () => {
    const { followedArtistList, loading } = useArtistsListContext();
    return (
      <div>
        {loading && <span>Loading</span>}
        {followedArtistList.map((artist, key) => (
          <span key={key}>Artist: {artist.name}</span>
        ))}
      </div>
    );
  };

  it('gets/sets followed artists', async () => {
    server.use(mswFollowedArtists.success(2));
    const { findAllByText } = await renderWithAct(<ArtistList />);

    const artists = await findAllByText(/Artist/i);
    expect(artists).toHaveLength(2);
  });
});
