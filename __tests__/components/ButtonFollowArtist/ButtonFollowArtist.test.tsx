import React from 'react';
import { render } from '@testing-library/react';
import ButtonFollowArtist from '@/components/ButtonFollowArtist/ButtonFollowArtist';
import { ButtonAction } from '@/components/ButtonFollowArtist/ButtonFollowArtist.types';

describe('ButtonFollowArtist', () => {
  it('renders an enabled button by default and not a loading spinner', () => {
    const { getByRole, queryByRole } = render(
      <ButtonFollowArtist artist={{ name: 'Cabin Crew' }} buttonAction={ButtonAction.Follow} />,
    );
    const btn = getByRole('button');
    const svg = queryByRole('img');

    expect(btn).not.toHaveAttribute('disabled');
    expect(svg).not.toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <ButtonFollowArtist artist={{ name: 'Cabin Crew' }} buttonAction={ButtonAction.Follow} />,
    );
    expect(container).toMatchSnapshot();
  });
});
