import { MainProps } from './Main.types';
import List from '../List/List';
import React, { useEffect, useState } from 'react';
import { ListEl } from '../List/List.types';
import Search from '../Search/Search';
import { searchI18n } from '../Search/Search.data';
import { listI18n } from '../List/List.data';
import { useUser } from '@auth0/nextjs-auth0';
import Login from '../Login/Login';

const Main: React.FunctionComponent<MainProps> = ({ i18n }) => {
  const { user, error } = useUser(); // TODO use isLoading or try Suspense

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [list, setList] = useState<ListEl[]>();

  useEffect(() => {
    console.warn(`${process.env.BE_BASE_URL}/todos/me/myArtists`);
    fetch(`${process.env.BE_BASE_URL}/todos/me/myArtists`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    })
      .then(response => response.json())
      .then(data => setList(data));
  }, []);

  if (!i18n || !i18n.todo) {
    return null;
  }

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main
      className={`flex flex-col items-center justify-center w-full p-3 mb-auto min-h-[calc(100vh_-_8.5rem)]`}
      style={{ minHeight: 'calc(100vh - 8.5rem)' }} /* the tailwind class only works locally */
    >
      {user ? (
        <div className={`flex flex-col items-center justify-center w-full lg:w-9/12`}>
          <Search i18n={searchI18n} />
          <List list={list} i18n={listI18n} />
        </div>
      ) : (
        <Login
          i18n={{
            welcome: 'Welcome to Release Raccoon!',
            loginBtn: 'Register',
            text: "Receive your favorite artists' music in your email every week!",
            artistsCount: 'Artists',
            releasesCount: 'Releases',
          }}
          handleRegister={() => (window.location.href = '/api/auth/login')}
          counters={{
            artistsCounter: 4965,
            releasesCounter: 3816,
          }}
        />
      )}
    </main>
  );
};

export default Main;
