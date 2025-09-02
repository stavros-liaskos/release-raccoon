import {
  artistsListI18n,
  buttonFollowI18n,
  followedArtistListI18n,
  footerI18n,
  formInputI18n,
  headerI18n,
  loginI18n,
  metaI18n,
  recommendationsI18n,
  scrapersI18n,
  searchI18n,
} from '@/i18n';

describe('metaI18n', () => {
  it('should have correct title, description, and url', () => {
    expect(metaI18n.title).toBe('Release Raccoon');
    expect(metaI18n.description).toBe('A music release newsletter');
  });
});

describe('searchI18n', () => {
  it('should have correct label and button', () => {
    expect(searchI18n.label).toBe('Search for an artist');
    expect(searchI18n.button).toBe('Search');
  });
  it('should have correct searchList.noArtists', () => {
    expect(searchI18n.searchList.noArtists).toBe('No artists found');
  });
});

describe('headerI18n', () => {
  it('should have correct logoutBtn', () => {
    expect(headerI18n.logoutBtn).toBe('Logout');
  });
});

describe('followedArtistListI18n', () => {
  it('should have correct title and filter', () => {
    expect(followedArtistListI18n.filter).toBe('filter followed artists');
  });
  it('should have correct artistList properties', () => {
    expect(followedArtistListI18n.artistList.btnTxt).toBe('Unfollow');
    expect(followedArtistListI18n.artistList.noArtists).toBe('You do not track any artists yet');
  });
  it('should have correct formInput.label', () => {
    expect(followedArtistListI18n.formInput.label).toBe('Filter Followed artists');
  });
});

describe('loginI18n', () => {
  it('should have correct properties', () => {
    expect(loginI18n.welcome).toBe('Welcome to Release Raccoon!');
    expect(loginI18n.loginBtn).toBe('Log in');
    expect(loginI18n.registerBtn).toBe('Register');
    expect(loginI18n.text).toBe("Receive your favorite artists' music in your email every week!");
    expect(loginI18n.artistsCount).toBe('Artists');
    expect(loginI18n.releasesCount).toBe('Releases');
  });
});

describe('recommendationsI18n', () => {
  it('should have correct title', () => {
    expect(recommendationsI18n.title).toBe('Recommended for you');
  });
  it('should have correct artistList.noArtists', () => {
    expect(recommendationsI18n.artistList.noArtists).toBe('There are no recommended artists for you :(');
  });
});

describe('buttonFollowI18n', () => {
  it('should have correct btnFollow and btnUnfollow', () => {
    expect(buttonFollowI18n.btnFollow).toBe('Follow');
    expect(buttonFollowI18n.btnUnfollow).toBe('Unfollow');
  });
});

describe('scrapersI18n', () => {
  it('should have correct connect and connected', () => {
    expect(scrapersI18n.connect).toBe('Connect');
    expect(scrapersI18n.connected).toBe('Connected');
  });
});

describe('formInputI18n', () => {
  it('should have correct label', () => {
    expect(formInputI18n.label).toBe('Search for an artist');
  });
});

describe('footerI18n', () => {
  it('should have correct copyright', () => {
    expect(footerI18n.copyright).toBe('© Release Raccoon');
  });
});

describe('artistsListI18n', () => {
  it('should have correct noArtists', () => {
    expect(artistsListI18n.noArtists).toBe('You do not track any artists yet');
  });
});
