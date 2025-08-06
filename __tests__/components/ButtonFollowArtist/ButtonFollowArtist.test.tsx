import React from 'react';

import ButtonFollowArtist from '@/components/ButtonFollowArtist/ButtonFollowArtist';
import { ButtonAction } from '@/components/ButtonFollowArtist/ButtonFollowArtist.types';

import { renderWithAct } from '../../testUtils/testUtils';

describe('ButtonFollowArtist', () => {
  it('renders an enabled button by default and not a loading spinner', async () => {
    const { getByRole, queryByRole } = await renderWithAct(
      <ButtonFollowArtist artist={{ name: 'Cabin Crew' }} buttonAction={ButtonAction.Follow} />,
    );
    const btn = getByRole('button');
    const svg = queryByRole('img');

    expect(btn).not.toHaveAttribute('disabled');
    expect(svg).not.toBeInTheDocument();
  });

  it('matches snapshot', async () => {
    const { container } = await renderWithAct(
      <ButtonFollowArtist artist={{ name: 'Cabin Crew' }} buttonAction={ButtonAction.Follow} />,
    );
    expect(container).toMatchSnapshot();
  });
});
