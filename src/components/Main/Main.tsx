import FollowedArtistList from '../FollowedArtistList/FollowedArtistList';
import React, { Suspense } from 'react';
import Search from '../Search/Search';
import { useUser } from '@auth0/nextjs-auth0';
import Login from '../Login/Login';
import Scrapers from '../Scrape/Scrapers';
import Recommendations from '../Recommendations/Recommendations';
import Loading from '../Loading/Loading';
import { searchI18n, followedArtistListI18n, loginI18n, recommendationsI18n } from '../../i18n';

const Main: React.FunctionComponent = () => {
  const { user } = useUser();

  return (
    <main className="rr-column flex-auto">
      <div className="flex flex-col flex-auto w-full lg:w-9/12">
        {user ? (
          <>
            <Search i18n={searchI18n} />
            <Scrapers />
            <div className="flex flex-auto flex-col h24">
              <FollowedArtistList i18n={followedArtistListI18n} />
              <Suspense fallback={<Loading />}>
                <Recommendations i18n={recommendationsI18n} />
              </Suspense>
            </div>
          </>
        ) : (
          <Login i18n={loginI18n} />
        )}
      </div>
    </main>
  );
};
Main.whyDidYouRender = false;
export default Main;
