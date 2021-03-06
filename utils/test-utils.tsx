import React from 'react';
import { render, act } from '@testing-library/react';
import ThemeProvider from '../contexts/ThemeProvider';
import { UserProvider } from '@auth0/nextjs-auth0';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <UserProvider>{children}</UserProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: { [key: string]: unknown }) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

export const renderWithAct = async (ui: React.ReactElement, options?: { [key: string]: unknown }) => {
  const component = render(ui, { wrapper: AllTheProviders, ...options });

  const promise = Promise.resolve();
  await act(() => promise);

  return component;
};

export const beforeEachTest = () => {
  jest.resetModules();
  jest.clearAllMocks();
  jest.restoreAllMocks();
  localStorage.clear();
};
