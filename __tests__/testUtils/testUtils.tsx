import { act, render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import React from 'react';

import ArtistsListProvider from '@/contexts/ArtistsList/ArtistsListProvider';
import SearchProvider from '@/contexts/Search/SearchProvider';
import ThemeProvider from '@/contexts/Theme/ThemeProvider';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <ArtistsListProvider>
        <SearchProvider>{children}</SearchProvider>
      </ArtistsListProvider>
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

// use to render async RSC for unit testing https://github.com/vercel/next.js/issues/47131#issuecomment-1481289418
export async function resolvedComponent(Component: React.FunctionComponent, props: Record<string, unknown> = {}) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}
