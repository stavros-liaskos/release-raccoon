import followedArtists from './fixtures/responses/followed-artists.json';
import auth from './fixtures/responses/auth.json';
import raccoonUser from './fixtures/responses/raccoon-user.json';
import { components } from '../types/schema';
import { http, HttpResponse } from 'msw';
import { Paths } from '../types/endpoints';

export const mswAuth = {
  success: () =>
    http.get(Paths.Auth, () => {
      return HttpResponse.json(auth, { status: 200 });
    }),
  fail: () =>
    http.get(Paths.Auth, () => {
      return HttpResponse.error();
    }),
};

export const mswFollowedArtists = {
  success: (artistQuantity: number = 2) => {
    followedArtists.rows.splice(1, 2 - artistQuantity);
    return http.get(`${Paths.FollowedArtists}`, () => {
      return HttpResponse.json(followedArtists, { status: 200 });
    });
  },
  fail: () => http.get(Paths.FollowedArtists, () => HttpResponse.error()),
};

export const mswRecommendedArtists = {
  success: () =>
    http.get(Paths.Recommended, () => {
      return HttpResponse.json(followedArtists, { status: 200 });
    }),
};

export const mswScrape = {
  success: () =>
    http.get(Paths.ScrapeSpotify, () => {
      return HttpResponse.json({}, { status: 200 });
    }),
  fail: () =>
    http.get(Paths.ScrapeSpotify, () => {
      return HttpResponse.error();
    }),
};

export const mswFollow = {
  success: () =>
    http.post(Paths.Follow, () => {
      return HttpResponse.json('OK', { status: 200 });
    }),
  fail: () =>
    http.post(Paths.Follow, () => {
      return HttpResponse.error();
    }),
};

export const mswUnfollow = {
  success: () =>
    http.delete(Paths.UnfollowArtist, () => {
      return HttpResponse.json('OK', { status: 200 });
    }),
};

export const mswSearch = {
  success: (res: components['schemas']['ArtistSearchResponse']) =>
    http.get(Paths.Search, () => {
      return HttpResponse.json(res, { status: 200 });
    }),
};

export const mswRaccoonUser = {
  success: () =>
    http.get(Paths.RaccoonUser, () => {
      return HttpResponse.json(raccoonUser, { status: 200 });
    }),
};
