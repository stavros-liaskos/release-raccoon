import { render } from '@testing-library/react';
import React from 'react';

import Hero from '@/components/Hero/Hero';
import { loginI18n } from '@/i18n';

// Mock auth0
jest.mock('@/lib/auth0', () => ({
  auth0: {
    getSession: jest.fn(),
  },
}));

// Mock HeroStats component to avoid async issues in tests
jest.mock('@/components/Hero/HeroStats', () => {
  return function MockHeroStats() {
    return React.createElement('div', { 'data-testid': 'hero-stats' }, 'Mock Hero Stats');
  };
});

const mockAuth0 = require('@/lib/auth0').auth0;

describe('Hero', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders welcome message, description, Mocked stats', async () => {
    mockAuth0.getSession.mockResolvedValue(null);

    const { getByText } = render(await Hero());

    expect(getByText(loginI18n.welcome)).toBeTruthy();
    expect(getByText('Mock Hero Stats')).toBeTruthy();
  });

  it('renders login button when not authenticated', async () => {
    mockAuth0.getSession.mockResolvedValue(null);

    const { getByText } = render(await Hero());

    expect(getByText(loginI18n.loginBtn)).toBeTruthy();
  });

  it('renders profile button when authenticated', async () => {
    mockAuth0.getSession.mockResolvedValue({ user: { email: 'test@example.com' } });

    const { getByText } = render(await Hero());

    expect(getByText(loginI18n.goToProfile)).toBeTruthy();
  });
});
