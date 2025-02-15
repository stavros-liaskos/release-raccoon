import '../scripts/wdyr';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import ThemeProvider from '../contexts/Theme/ThemeProvider';
import ArtistsListProvider from '../contexts/ArtistsList/ArtistsListProvider';
import Meta from '../components/Meta/Meta';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <ArtistsListProvider>
            <Meta />
            <Component {...pageProps} />
          </ArtistsListProvider>
        </QueryClientProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
