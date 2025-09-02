import React from 'react';
import { render } from '@testing-library/react';
import Footer from '@/components/Footer/Footer';

jest.mock('@/i18n', () => ({
  footerI18n: {
    copyright: '© Release Raccoon',
  },
}));

describe('Footer', () => {
  it('renders the footer with correct links', () => {
    const { getByText } = render(<Footer />);

    const supportLink = getByText('Support');
    expect(supportLink).toBeInTheDocument();
    expect(supportLink.closest('a')).toHaveAttribute('href', '/support');

    const copyrightText = getByText(`© Release Raccoon ${new Date().getFullYear()}`);
    expect(copyrightText).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
