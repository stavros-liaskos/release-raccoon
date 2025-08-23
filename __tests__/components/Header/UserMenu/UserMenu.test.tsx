import { render, screen } from '@testing-library/react';
import React from 'react';

import UserMenu from '@/components/Header/UserMenu/UserMenu';
import { headerI18n } from '@/i18n';

describe('UserMenu', () => {
  it('renders all menu items', () => {
    render(<UserMenu />);

    expect(screen.getByText(headerI18n.profile)).toBeInTheDocument();
    expect(screen.getByText(headerI18n.settings)).toBeInTheDocument();
    expect(screen.getByText(headerI18n.logoutBtn)).toBeInTheDocument();
  });

  it('renders with proper navigation links', () => {
    render(<UserMenu />);

    const profileLink = screen.getByText(headerI18n.profile).closest('a');
    const settingsLink = screen.getByText(headerI18n.settings).closest('a');
    const logoutLink = screen.getByText(headerI18n.logoutBtn).closest('a');

    expect(profileLink).toHaveAttribute('href', '/profile');
    expect(settingsLink).toHaveAttribute('href', '/profile/settings');
    expect(logoutLink).toHaveAttribute('href', '/auth/logout');
  });

  it('renders with Material Design icons', () => {
    const { container } = render(<UserMenu />);

    // Check for SVG icons
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements).toHaveLength(3); // Profile, Settings, Logout icons

    // Check for proper icon styling
    svgElements.forEach(svg => {
      expect(svg).toHaveClass('w-5', 'h-5');
    });
  });

  it('applies modern styling classes', () => {
    const { container } = render(<UserMenu />);

    // Check for rounded corners
    const menuContainer = container.querySelector('.rounded-lg');
    expect(menuContainer).toBeInTheDocument();

    // Check for shadow
    const shadowContainer = container.querySelector('.shadow-lg');
    expect(shadowContainer).toBeInTheDocument();

    // Check for animation classes
    const animatedContainer = container.querySelector('.animate-in');
    expect(animatedContainer).toBeInTheDocument();
  });

  it('applies hover states', () => {
    render(<UserMenu />);

    const profileItem = screen.getByText(headerI18n.profile).closest('a');
    const settingsItem = screen.getByText(headerI18n.settings).closest('a');
    const logoutItem = screen.getByText(headerI18n.logoutBtn).closest('a');

    expect(profileItem).toHaveClass('hover:bg-gray-100', 'dark:hover:bg-gh-dark');
    expect(settingsItem).toHaveClass('hover:bg-gray-100', 'dark:hover:bg-gh-dark');
    expect(logoutItem).toHaveClass('hover:bg-red-50', 'dark:hover:bg-red-900/20');
  });

  it('has proper separator before logout', () => {
    const { container } = render(<UserMenu />);

    const logoutItem = screen.getByText(headerI18n.logoutBtn).closest('li');
    expect(logoutItem).toHaveClass('border-t', 'border-gray-200', 'dark:border-gh-border');
  });

  it('matches snapshot', () => {
    const { container } = render(<UserMenu />);
    expect(container).toMatchSnapshot();
  });
});