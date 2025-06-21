import React from 'react';
import { render, act } from '@testing-library/react';
import ThemeProvider from '../contexts/Theme/ThemeProvider';
import ArtistsListProvider from '../contexts/ArtistsList/ArtistsListProvider';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ArtistsListProvider>{children}</ArtistsListProvider>
      </QueryClientProvider>
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

export const resetMocks = () => {
  jest.resetModules();
  jest.clearAllMocks();
  jest.restoreAllMocks();
  localStorage.clear();
};

export function initServer() {
  const server = setupServer();

  beforeAll(() => {
    server.listen();
    server.listen({
      onUnhandledRequest: 'error',
    });
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  return server;
}
