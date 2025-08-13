# ReleaseRaccoon

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=stavros-liaskos_release-raccoon&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=stavros-liaskos_release-raccoon)

A music release newsletter frontend application built on [Next.js](https://nextjs.org/).

Backend available here: https://github.com/jaivalis/release-raccoon

## How to develop

Make a copy of `.env` to `.env.local`.

```shell
$ cp .env .env.local
```

More on how to generate this values [here](https://auth0.com/docs/quickstart/webapp/nextjs)

First install deps:

```shell
$ yarn
```

Start the development server:

```bash
$ yarn dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser to view the website. That's it!

Do some changes on the code. The changes are automatically applied with the help of Next.js [Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh).

When you are happy with your changes proceed with committing them. [Husky](https://github.com/typicode/husky)
will trigger Prettier, Linter and Tests for the changed files according to [lint-staged](https://github.com/okonet/lint-staged).

You can also manually run them individually.

Prettier:

```shell
$ yarn prettier
```

Eslint (with Typescript):

```shell
$ yarn lint
```

Tests (Jest):

```shell
$ yarn test
```

## Mock Data

TODO update this to be enabled via env var or even better use [MSW](https://mswjs.io/) and keep prod code clean.

You can work with mock server data.  
Simply set env `API_BASE_URL` to `https://localhost:3000` and all API calls will be forwarded to NextJS local API and served with mocked data from `/mocks/responses/`

## Deployments

This project uses [Vercel](https://vercel.com/) as it's hosting platform.  
Vercel builds a production optimized version using:

```shell
$ yarn build
```

You can do the same locally. After you build, start the production server that uses that build:

```shell
$ yarn start
```

### Development deployments

Each PR creates automatically a Preview env where one can visually verify the results.

### Production deployments

Each commit to `master` triggers a production deployment.

> Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Spotify
The user can connect their Spotify account to the app and follow the same artists by "scraping" their Spotify profile.  
Spotify session is needed to generate access token and access their API, best described [here](https://developer.spotify.com/documentation/web-api/tutorials/code-flow).


## Dark mode

Dark mode state is initialized by reading the OS preference or to `light` if that fails. It's also customizable by the user.

## API Endpoints

API endpoints for the app are documented in [this OpenAPI](./openAPI.yml) export and are based on the BE project [here](https://github.com/jaivalis/release-raccoon#readme).  
A [JSON Web Token](https://datatracker.ietf.org/doc/html/rfc7519) is required for each request.  
To generate a ts schema:

```shell
$ npx openapi-typescript openapi.yml --output src/types/schema.ts
```

## Icons

#### In-app icons

Icons used in the application are generated using [Tailwind Toolbox](https://www.tailwindtoolbox.com/icons) and transformed with [svg2gsx](https://svg2jsx.com/).

## i18n

At the moment only one language is supported.  
All translations can be found [here](./src/i18n.ts)

## Supported browsers

List supported browsers:

```shell
$ npx browserslist ">0.3%, not ie 11, not dead, not op_mini all"
```

## Learn More about Next.js

Take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
