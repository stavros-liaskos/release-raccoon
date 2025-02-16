// import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { resetMocks, renderWithAct, initServer } from '../../utils/test-utils';
// import Main from './Main';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mswAuth, mswFollowedArtists, mswRaccoonUser, mswRecommendedArtists } from '../../mocks/mockApi';
xdescribe('Main', () => {
  const server = initServer();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    resetMocks();
    server.use(mswFollowedArtists.success(2));
  });

  it.todo('does something');

  // it('renders without data without crashing', async () => {
  //   server.use(mswAuth.success(), mswRecommendedArtists.success(), mswRaccoonUser.success());
  //
  //   // @ts-ignore
  //   await renderWithAct(<Main />);
  // });

  // it('shows registration button', async () => {
  //   server.use(mswAuth.fail());
  //   const { findAllByText } = await renderWithAct(
  //     <Auth0Provider>
  //       <Main />
  //     </Auth0Provider>,
  //   );
  //
  //   expect(await findAllByText(/Register/)).toHaveLength(1);
  // });
  //
  // it('shows artist search for logged in user', async () => {
  //   server.use(mswAuth.success(), mswRecommendedArtists.success());
  //
  //   const { findAllByRole } = await renderWithAct(
  //     <Auth0Provider user={{ user: 'john.doe' }}>
  //       <Main />
  //     </Auth0Provider>,
  //   );
  //
  //   expect(await findAllByRole('textbox')).toHaveLength(2); // Search, Filter (Recommendations)
  // });
});
