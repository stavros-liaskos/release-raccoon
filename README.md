# ReleaseRaccoon

A music release newsletter frontend application built on [Next.js](https://nextjs.org/).

Backend available here: https://github.com/jaivalis/release-raccoon

## How to develop

First install deps:

```shell
yarn
```

Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Do some changes on the code. The changes are automatically applied with the help of Next.js [Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh).

When you are happy with your changes proceed with committing them. [Husky](https://github.com/typicode/husky)
will trigger Prettier, Linter and Tests for the changed files according to [lint-staged](https://github.com/okonet/lint-staged).

You can also manually run them individually.

Prettier:

```shell
yarn prettier
```

Eslint (with Typescript):

```shell
yarn lint
```

Tests (Jest):

```shell
yarn test
```

## Deployments

This project uses [Vercel](https://vercel.com/) as it's hosting platform.  
Vercel builds a production optimized version using:

```shell
yarn build
```

You can do the same locally. After you build, start the production server that uses that build:

```shell
yarn start
```

### Development deployments

Each PR creates automatically a Preview env where one can visually verify the results.

### Production deployments

Each commit to `master` triggers a production deployment.

> Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Dark mode

Dark mode state is initialized by reading the OS preference or to `light` if that fails. It's also customizable by the user.

## API Endpoints

API endpoints for the app and their usage is explained in the following table.  
A [JSON Web Token](https://datatracker.ietf.org/doc/html/rfc7519) is required for each request.

| Endpoint                                          | Method |                                                                                                            Payload |                    Usage |
| ------------------------------------------------- | :----: | -----------------------------------------------------------------------------------------------------------------: | -----------------------: |
| `https://release-racconBE.com/todos/me/follow`    |  POST  | [`ListEl` Obj](https://github.com/stavros-liaskos/release-raccoon/blob/master/components/List/List.types.ts#L1-L6) |        Follow new artist |
| `https://release-racconBE.com/todos/me/unfollow`  |  POST  | [`ListEl` Obj](https://github.com/stavros-liaskos/release-raccoon/blob/master/components/List/List.types.ts#L1-L6) |          Unfollow artist |
| `https://release-racconBE.com/todos/me/search`    |  GET   |                                                                                                     `query` string | Search artists for query |
| `https://release-racconBE.com/todos/me/myArtists` |  GET   |                                                                                                                    |  Get my followed artists |

> API endpoints can be found on the backend project [here](https://github.com/jaivalis/release-raccoon#readmeTODO)

## Supported browsers

List supported browsers:

```shell
npx browserslist ">0.3%, not ie 11, not dead, not op_mini all"
```

## Learn More about Next.js

Take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
