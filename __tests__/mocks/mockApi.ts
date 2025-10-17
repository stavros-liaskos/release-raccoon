import { http, HttpResponse } from 'msw';

import { API_Paths, Paths } from '@/types/endpoints';
import { components } from '@/types/schema';

import followedArtists from './fixtures/responses/followed-artists.json';
import raccoonUser from './fixtures/responses/raccoon-user.json';

export const mswFollowedArtists = {
  success: (artistQuantity: number = 2) => {
    return http.get(`${Paths.FollowedArtists}`, ({ request }) => {
      const url = new URL(request.url);
      const page = Number(url.searchParams.get('page')) || 1;
      const offset = Number(url.searchParams.get('offset')) || 10;
      const start = (page - 1) * offset;
      const end = start + offset;

      const paginatedArtists = followedArtists.rows.slice(start, end);

      return HttpResponse.json({ ...followedArtists, rows: paginatedArtists }, { status: 200 });
    });
  },
  fail: () => http.get(Paths.FollowedArtists, () => HttpResponse.error()),
};

export const mswRecommendedArtists = {
  success: () =>
    http.get(`${process.env.APP_BASE_URL}/${API_Paths.Recommended}`, () => {
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
    http.delete(`${Paths.UnfollowArtist}/*`, () => {
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
