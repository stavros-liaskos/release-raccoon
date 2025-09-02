// Auth0 external endpoints
export const Auth0Endpoints: { [key: string]: string } = {
  Login: '/auth/login',
  Logout: '/auth/logout',
};

// FE navigation paths
export const NavigationPaths: { [key: string]: string } = {
  Home: '/',
  Profile: '/profile',
  Settings: '/profile/settings',
  Spotify: '/profile/spotify',
};

// Spotify endpoints
export const SpotifyPaths: { [key: string]: string } = {
  Authorize: '/authorize',
  Token: '/api/token',
};

// Router Handler endpoints (aka Next.js API routes)
export const Paths: { [key: string]: string } = {
  Auth: '/api/auth/me',
  Search: `api/artist/search`,
  Recommended: `api/artists/recommended`,
  Follow: `api/me/follow`,
  FollowedArtists: `api/me/followed-artists`,
  UnfollowArtist: `api/me/unfollow`,
  RaccoonUser: `api/raccoon-user`, // TODO rm
  ScrapeLastFM: `api/scrape-taste/lastfm`,
  ScrapeSpotify: `api/scrape-taste/spotify`, // TODO is it needed?
  SpotifyCode: `api/spotify`,
  EnableSrapeServices: `api/me/enable-services`, // TODO
  Settings: `api/me/settings`, // TODO
  Stats: `api/stats`,
};

// External API paths
export const API_Paths: { [key: string]: string } = {
  Auth: '/api/auth/me',
  Search: `artist/search`,
  Recommended: `artists/recommended`,
  Follow: `me/follow`,
  FollowedArtists: `me/followed-artists`,
  UnfollowArtist: `me/unfollow`,
  RaccoonUser: `raccoon-user`, // TODO rm
  ScrapeLastFM: `scrape-taste/lastfm`,
  ScrapeSpotifyWithAuth: `scrape-taste/spotify/client-auth`,
  ScrapeSpotify: `scrape-taste/spotify`, // TODO is it needed?
  EnableSrapeServices: `me/enable-services`, // TODO
  Settings: `me/settings`, // TODO
  Stats: `stats`,
  ReleaseCount: `release/count`,
};
