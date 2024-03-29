/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/': {
    get: {
      responses: {
        /** @description OK */
        200: never;
      };
    };
  };
  '/artist': {
    get: {
      parameters?: {
        query?: {
          page?: number;
          size?: number;
          sort?: unknown[];
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            'application/json': components['schemas']['Artist'][];
          };
        };
      };
    };
    post: {
      requestBody?: {
        content: {
          'application/json': components['schemas']['Artist'];
        };
      };
      responses: {
        201: {
          content: {
            'application/json': components['schemas']['Artist'];
          };
        };
      };
    };
  };
  '/artist/count': {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            'application/json': number;
          };
        };
      };
    };
  };
  '/artist/search': {
    get: {
      parameters?: {
        query?: {
          pattern?: string;
          size?: number;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            'application/json': components['schemas']['ArtistSearchResponse'];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  '/artist/{id}': {
    get: {
      parameters: {
        path: {
          id: number;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            'application/json': components['schemas']['Artist'];
          };
        };
      };
    };
    put: {
      parameters: {
        path: {
          id: number;
        };
      };
      requestBody?: {
        content: {
          'application/json': components['schemas']['Artist'];
        };
      };
      responses: {
        201: {
          content: {
            'application/json': components['schemas']['Artist'];
          };
        };
      };
    };
    delete: {
      parameters: {
        path: {
          id: number;
        };
      };
      responses: {
        204: never;
      };
    };
  };
  '/me': {
    get: {
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  '/me/enable-services': {
    get: {
      parameters?: {
        query?: {
          enableSpotify?: boolean;
          lastfmUsername?: string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  '/me/follow': {
    post: {
      requestBody?: {
        content: {
          'application/json': components['schemas']['SearchResultArtistDto'];
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  '/me/followed-artists': {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            'application/json': components['schemas']['FollowedArtistsResponse'];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  '/me/unfollow/{artistId}': {
    delete: {
      parameters: {
        path: {
          artistId: number;
        };
      };
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
  };
  '/notify-users': {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            'application/json': boolean;
          };
        };
      };
    };
  };
  '/raccoon-user': {
    get: {
      parameters?: {
        query?: {
          page?: number;
          size?: number;
          sort?: unknown[];
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            'application/json': components['schemas']['RaccoonUser'][];
          };
        };
      };
    };
    post: {
      requestBody?: {
        content: {
          'application/json': components['schemas']['RaccoonUser'];
        };
      };
      responses: {
        201: {
          content: {
            'application/json': components['schemas']['RaccoonUser'];
          };
        };
      };
    };
  };
  '/raccoon-user/count': {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            'application/json': number;
          };
        };
      };
    };
  };
  '/raccoon-user/{id}': {
    get: {
      parameters: {
        path: {
          id: number;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            'application/json': components['schemas']['RaccoonUser'];
          };
        };
      };
    };
    put: {
      parameters: {
        path: {
          id: number;
        };
      };
      requestBody?: {
        content: {
          'application/json': components['schemas']['RaccoonUser'];
        };
      };
      responses: {
        201: {
          content: {
            'application/json': components['schemas']['RaccoonUser'];
          };
        };
      };
    };
    delete: {
      parameters: {
        path: {
          id: number;
        };
      };
      responses: {
        204: never;
      };
    };
  };
  '/release': {
    get: {
      parameters?: {
        query?: {
          page?: number;
          size?: number;
          sort?: unknown[];
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            'application/json': components['schemas']['Release'][];
          };
        };
      };
    };
    post: {
      requestBody?: {
        content: {
          'application/json': components['schemas']['Release'];
        };
      };
      responses: {
        201: {
          content: {
            'application/json': components['schemas']['Release'];
          };
        };
      };
    };
  };
  '/release-scrape': {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            'application/json': components['schemas']['Release'][];
          };
        };
      };
    };
  };
  '/release/count': {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            'application/json': number;
          };
        };
      };
    };
  };
  '/release/{id}': {
    get: {
      parameters: {
        path: {
          id: number;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            'application/json': components['schemas']['Release'];
          };
        };
      };
    };
    put: {
      parameters: {
        path: {
          id: number;
        };
      };
      requestBody?: {
        content: {
          'application/json': components['schemas']['Release'];
        };
      };
      responses: {
        201: {
          content: {
            'application/json': components['schemas']['Release'];
          };
        };
      };
    };
    delete: {
      parameters: {
        path: {
          id: number;
        };
      };
      responses: {
        204: never;
      };
    };
  };
  '/scrape-taste/lastfm': {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            'text/plain': components['schemas']['UserArtist'][];
          };
        };
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    parameters?: {
      query?: {
        email?: string;
      };
    };
  };
  '/scrape-taste/spotify': {
    get: {
      responses: {
        /** @description OK */
        200: never;
        /** @description Not Authorized */
        401: never;
        /** @description Not Allowed */
        403: never;
      };
    };
    parameters?: {
      query?: {
        email?: string;
      };
    };
  };
  '/spotify-auth-callback': {
    get: {
      parameters?: {
        query?: {
          code?: string;
          error?: string;
          state?: string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
      };
    };
    post: {
      requestBody?: {
        content: {
          'application/json': components['schemas']['RegisterUserRequest'];
        };
      };
      responses: {
        /** @description OK */
        200: never;
      };
    };
  };
  '/spotify-auth-callback/user-top-artists': {
    get: {
      parameters?: {
        query?: {
          userId?: string;
        };
      };
      responses: {
        /** @description OK */
        200: never;
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Artist: {
      /** Format: int64 */
      id?: number;
      createDate?: components['schemas']['LocalDateTime'];
      name?: string;
      lastfmUri?: string;
      spotifyUri?: string;
      musicbrainzId?: string;
      spotifyUriId?: string;
    };
    ArtistSearchResponse: {
      /** Format: int32 */
      count?: number;
      artists?: components['schemas']['SearchResultArtistDto'][];
    };
    FollowedArtistDto: {
      /** Format: int64 */
      id: number;
      name: string;
      lastfmUri?: string;
      spotifyUri?: string;
      musicbrainzId?: string;
    };
    FollowedArtistsResponse: {
      /** Format: int32 */
      total?: number;
      rows?: components['schemas']['FollowedArtistDto'][];
    };
    /**
     * Format: date
     * @example "2022-03-10T00:00:00.000Z"
     */
    LocalDate: string;
    /**
     * Format: date-time
     * @example "2022-03-10T12:15:50.000Z"
     */
    LocalDateTime: string;
    RaccoonUser: {
      /** Format: int64 */
      id?: number;
      email: string;
      username?: string;
      lastfmUsername?: string;
      spotifyEnabled?: boolean;
      lastNotified?: components['schemas']['LocalDate'];
      createDate?: components['schemas']['LocalDateTime'];
      modifyDate?: components['schemas']['LocalDateTime'];
      lastSpotifyScrape?: components['schemas']['LocalDateTime'];
      lastLastFmScrape?: components['schemas']['LocalDateTime'];
    };
    RegisterUserRequest: {
      email: string;
      lastfmUsername?: string;
      spotifyEnabled?: boolean;
    };
    Release: {
      /** Format: int64 */
      id?: number;
      name?: string;
      type?: string;
      spotifyUri?: string;
      musicbrainzId?: string;
      releasedOn?: components['schemas']['LocalDate'];
    };
    SearchResultArtistDto: {
      /** Format: int64 */
      id?: number;
      name: string;
      lastfmUri?: string;
      spotifyUri?: string;
      musicbrainzId?: string;
      followedByUser?: boolean;
    };
    UserArtist: {
      /** Format: float */
      weight?: number;
      hasNewRelease?: boolean;
      user?: components['schemas']['RaccoonUser'] & Record<string, never>;
      artist?: components['schemas']['Artist'] & Record<string, never>;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export type operations = Record<string, never>;
