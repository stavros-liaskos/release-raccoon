import '@testing-library/jest-dom';
import 'jest-localstorage-mock';
import './__tests__/mocks/matchMedia'; // https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
import 'whatwg-fetch'; // https://github.com/jestjs/jest/issues/13834#issuecomment-1407375787

process.env = Object.assign(process.env, {
  API_BASE_URL: 'http://localhost',
  API_AUDIENCE: 'https://my.api.com',
  API_SCOPE: 'read:releases write:releases',
});
global.TextEncoder = require('util').TextEncoder;

jest.mock('@/lib/auth0', () => {
  const originalModule = jest.requireActual('next/server');

  return {
    ...originalModule,
    auth0: {
      withApiAuthRequired: (handler: Function) => handler,
    },
  };
});
