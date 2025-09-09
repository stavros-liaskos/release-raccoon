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
  Search: `api/protected/artist/search`,
  Recommended: `api/protected/artists/recommended`,
  Follow: `api/protected/follow`,
  FollowedArtists: `api/protected/followed-artists`,
  UnfollowArtist: `api/protected/unfollow`,
  RaccoonUser: `api/protected/profile`,
  ScrapeLastFM: `api/protected/scrape-taste/lastfm`,
  SpotifyCode: `api/protected/spotify`,
  Settings: `api/protected/settings`, // TODO
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
  RaccoonUser: `me/profile`,
  ScrapeLastFM: `scrape-taste/lastfm`,
  ScrapeSpotifyWithAuth: `scrape-taste/spotify/client-auth`,
  Settings: `me/settings`, // TODO
  Stats: `stats`,
  ReleaseCount: `release/count`,
};
