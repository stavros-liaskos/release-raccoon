const Paths = {
  Auth: '/api/auth/me',
  Search: `/artist/search`,
  Recommended: `/artists/recommended`,
  Follow: `/me/follow`,
  FollowedArtists: `/me/followed-artists`,
  UnfollowArtist: `/me/unfollow`,
  RaccoonUser: `/raccoon-user`,
  ScrapeLastFM: `/scrape-taste/lastfm`,
  ScrapeSpotify: `/scrape-taste/spotify`,
};

const Endpoints: Record<string, string> = {
  Auth: `${process.env.API_BASE_URL}${Paths.Auth}`,
  Search: `${process.env.API_BASE_URL}${Paths.Search}`,
  Recommended: `${process.env.API_BASE_URL}${Paths.Recommended}`,
  Follow: `${process.env.API_BASE_URL}${Paths.Follow}`,
  FollowedArtists: `${process.env.API_BASE_URL}${Paths.FollowedArtists}`,
  UnfollowArtist: `${process.env.API_BASE_URL}${Paths.UnfollowArtist}`,
  RaccoonUser: `${process.env.API_BASE_URL}${Paths.RaccoonUser}`,
  ScrapeLastFM: `${process.env.API_BASE_URL}${Paths.ScrapeLastFM}`,
  ScrapeSpotify: `${process.env.API_BASE_URL}${Paths.ScrapeSpotify}`,
};

export default Endpoints;

export { Paths };
