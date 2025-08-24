import React from 'react';
import { render } from '@testing-library/react';
import Footer from '@/components/Footer/Footer';

jest.mock('@/i18n', () => ({
  footerI18n: {
    powered: 'Powered by',
  },
}));

describe('Footer', () => {
  it('renders the footer with correct links', () => {
    const { getByText } = render(<Footer />);

    const supportLink = getByText('Support');
    expect(supportLink).toBeInTheDocument();
    expect(supportLink.closest('a')).toHaveAttribute('href', '/support');

    const poweredByLink = getByText('Powered by');
    expect(poweredByLink).toBeInTheDocument();
    expect(poweredByLink.closest('a')).toHaveAttribute('href', 'https://github.com/jaivalis/release-raccoon');
  });

  it('matches snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
