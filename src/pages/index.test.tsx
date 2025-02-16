// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Home from './index.page';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { resetMocks, renderWithAct, initServer } from '../utils/test-utils';
import { mswAuth, mswFollowedArtists, mswRaccoonUser, mswRecommendedArtists } from '../mocks/mockApi';

xdescribe('Home', () => {
  const server = initServer();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    resetMocks();
    server.use(
      mswAuth.success(),
      mswRecommendedArtists.success(),
      mswFollowedArtists.success(2),
      mswRaccoonUser.success(),
    );
  });
  it.todo('does something');

  // it('renders a heading', async () => {
  //   const component = await renderWithAct(
  //     <Home
  //       session={{
  //         user: undefined,
  //       }}
  //     />,
  //   );
  //   const { container } = component;
  //
  //   expect(container).toMatchSnapshot();
  // });
});
