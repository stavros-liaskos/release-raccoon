import '../scripts/wdyr';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ThemeProvider from '../contexts/Theme/ThemeProvider';
import Meta from '../components/Meta/Meta';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { auth0 } from '../lib/auth0';
import { GetServerSideProps } from 'next';
import { Auth0Provider } from '@auth0/nextjs-auth0';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, session }: AppProps & { session: { user: unknown } }) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {/* @ts-ignore */}
        <Auth0Provider user={session?.user}>
          <Meta />
          <Component {...pageProps} />
        </Auth0Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export const getServerSideProps = (async ctx => {
  const session = await auth0.getSession(ctx.req);

  if (!session) return { props: { user: null } };

  return { props: { session } };
}) as GetServerSideProps<{ session: unknown | null }>;

export default MyApp;
