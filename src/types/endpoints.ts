// FE Endpoints to call Next.js API routes
export const Paths: { [key: string]: string } = {
  Auth: '/api/auth/me',
  Search: `api/artist/search`,
  Recommended: `api/artists/recommended`,
  Follow: `api/me/follow`,
  FollowedArtists: `api/me/followed-artists`,
  UnfollowArtist: `api/me/unfollow`,
  RaccoonUser: `api/raccoon-user`,
  ScrapeLastFM: `api/scrape-taste/lastfm`,
  ScrapeSpotify: `api/scrape-taste/spotify`,
};

// Route handlers' external API paths
export const API_Paths: { [key: string]: string } = {
  Auth: '/api/auth/me',
  Search: `artist/search`,
  Recommended: `artists/recommended`,
  Follow: `me/follow`,
  FollowedArtists: `me/followed-artists`,
  UnfollowArtist: `me/unfollow`,
  RaccoonUser: `raccoon-user`,
  ScrapeLastFM: `scrape-taste/lastfm`,
  ScrapeSpotify: `scrape-taste/spotify`,
};
