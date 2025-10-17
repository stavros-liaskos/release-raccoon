import manifest from './app/manifest.json';
import { SearchI18n } from './components/Search/Search.types';

export const metaI18n = {
  title: manifest.name,
  short_name: manifest.short_name,
  description: manifest.description,
};

export const searchI18n: SearchI18n = {
  label: 'Search for an artist',
  button: 'Search',
  searchList: {
    noArtists: 'No artists found',
  },
};

export const settingsI18n = {
  setSettings: 'Set Settings',
  getSettings: 'Get Settings',
  notifyInNumberOfDays: 'Notify me in number of days',
  subscribe: 'Subscribe to email notifications for new releases',
  saveBtn: 'Save',
};

export const headerI18n = {
  logoutBtn: 'Logout',
  settings: 'Settings',
  profile: 'Profile',
};

export const followedArtistListI18n = {
  filter: 'filter followed artists',
  artistList: {
    btnTxt: 'Unfollow',
    noArtists: 'You do not track any artists yet',
  },
  formInput: {
    label: 'Filter Followed artists',
  },
  pagination: {
    previous: 'Previous',
    next: 'Next',
  },
};

export const loginI18n = {
  welcome: 'Welcome to Release Raccoon!',
  loginBtn: 'Log in',
  goToProfile: 'Take me to my profile',
  registerBtn: 'Register',
  text: "Receive your favorite artists' music in your email every week!",
  artistsCount: 'Artists',
  releasesCount: 'Releases',
};

export const recommendationsI18n = {
  title: 'Recommended for you',
  artistList: {
    noArtists: 'There are no recommended artists for you :(',
  },
  pagination: {
    previous: 'Previous',
    next: 'Next',
  },
};

export const buttonFollowI18n = {
  btnFollow: 'Follow',
  btnUnfollow: 'Unfollow',
};

export const scrapersI18n = {
  title: 'Connect to other services',
  connect: 'Connect',
  connected: 'Connected',
};

export const lastFmFormI18n = {
  label: 'Last fm username',
  submitBtn: 'Sync LastFm',
  placeholder: 'Enter LastFm username',
  syncedMsg: 'Last synced to',
};

export const formInputI18n = {
  label: 'Search for an artist',
};

export const footerI18n = {
  copyright: '© Release Raccoon',
};
export const artistsListI18n = {
  noArtists: 'You do not track any artists yet',
};

export const listI18n = {
  followers: ' followers',
  follower: ' follower',
};

export const supportI18n = {
  title: 'Support',
  text: 'If you need help, please reach out to us at',
  email: 'releaseraccoon at gmail.com',
};

export const followedArtistsReleasesI18n = {
  title: 'New Releases',
  noReleases: 'No new releases from your followed artists',
  viewOnSpotify: 'View on Spotify',
};
