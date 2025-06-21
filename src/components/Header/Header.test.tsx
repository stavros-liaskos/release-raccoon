import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('hides Logout btn when user is logged out', () => {
    const { findByText } = render(<Header />);

    expect(findByText('Logout')).toMatchObject({});
  });

  it('shows Logout btn when user is logged in', async () => {
    const component = render(<Header />);

    expect(component.container).toMatchSnapshot();
  });
});
