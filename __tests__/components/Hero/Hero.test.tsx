import { render, screen } from '@testing-library/react';
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
    return <div data-testid="hero-stats">Mock Hero Stats</div>;
  };
});

const mockAuth0 = require('@/lib/auth0').auth0;

describe('Hero', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders welcome message and description', async () => {
    mockAuth0.getSession.mockResolvedValue(null);
    
    const { container } = await Hero();
    const html = container.innerHTML;
    
    expect(html).toContain(loginI18n.welcome);
    expect(html).toContain(loginI18n.text);
  });

  it('renders HeroStats component', async () => {
    mockAuth0.getSession.mockResolvedValue(null);
    
    const { container } = await Hero();
    const html = container.innerHTML;
    
    expect(html).toContain('Mock Hero Stats');
  });

  it('renders login button when not authenticated', async () => {
    mockAuth0.getSession.mockResolvedValue(null);
    
    const { container } = await Hero();
    const html = container.innerHTML;
    
    expect(html).toContain(loginI18n.loginBtn);
    expect(html).toContain('/auth/login');
  });

  it('renders profile button when authenticated', async () => {
    mockAuth0.getSession.mockResolvedValue({ user: { email: 'test@example.com' } });
    
    const { container } = await Hero();
    const html = container.innerHTML;
    
    expect(html).toContain(loginI18n.goToProfile);
    expect(html).toContain('/profile');
    expect(html).not.toContain('/auth/login');
  });

  it('applies modern styling classes', async () => {
    mockAuth0.getSession.mockResolvedValue(null);
    
    const { container } = await Hero();
    const html = container.innerHTML;
    
    // Check for rounded button corners
    expect(html).toContain('rounded-lg');
    // Check for button styling
    expect(html).toContain('btn-large');
  });

  it('returns null when i18n data is missing', async () => {
    const originalI18n = { ...loginI18n };
    // @ts-ignore
    loginI18n.loginBtn = undefined;
    
    const result = await Hero();
    
    expect(result).toBeNull();
    
    // Restore original i18n
    Object.assign(loginI18n, originalI18n);
  });
});
