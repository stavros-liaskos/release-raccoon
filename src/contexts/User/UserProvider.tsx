'use client';
import { useUser } from '@auth0/nextjs-auth0';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC, ReactNode, useEffect, useState } from 'react';

import { NavigationPaths, Paths } from '@/types/endpoints';
import { components } from '@/types/schema';

import { TRrUser, UserContext } from './UserContext';

interface ChildrenProps {
  children: ReactNode;
}

const RR_USER = 'rr'; // session storage key for Raccoon Raccoon user data

// stores scrapers data in session to avoid unnecessary API calls. In the future auth0 session data are extended to include these
const UserProvider: FC<ChildrenProps> = ({ children }) => {
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const [rrUser, setRrUser] = useState<TRrUser>({
    spotifyEnabled: false,
    lastfmUsername: '',
    isUserFetched: false,
    unsubscribed: false,
    notifyIntervalDays: 0,
  });
  const [loadingSettings, setLoadingSettings] = useState(false);

  useEffect(() => {
    if (rrUser?.isUserFetched) {
      return;
    }
    const rrUserSessionStore = sessionStorage.getItem(RR_USER);
    if (rrUserSessionStore) {
      setRrUser({ ...rrUser, ...JSON.parse(rrUserSessionStore) });
    }
  }, [pathname, rrUser, rrUser?.isUserFetched]);

  useEffect(() => {
    const rrUserSessionStore = JSON.parse(sessionStorage.getItem(RR_USER) || '{}');
    if (pathname !== NavigationPaths.Settings || !user?.email || rrUser?.isUserFetched) {
      return;
    }

    fetch(`/${Paths.RaccoonUser}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((raccoonUser: TRrUser) => {
        const isLastFmConnected = !!raccoonUser?.lastfmUsername;
        const isSpotifyConnected = !!raccoonUser?.spotifyEnabled;
        if (rrUser?.spotifyEnabled !== isSpotifyConnected || rrUser?.spotifyEnabled !== isLastFmConnected) {
          const updatedRrUser = {
            ...rrUser,
            ...rrUserSessionStore,
            spotifyEnabled: isSpotifyConnected,
            lastfmUsername: raccoonUser.lastfmUsername,
            isUserFetched: true,
            notifyIntervalDays: raccoonUser?.notifyIntervalDays,
            unsubscribed: raccoonUser?.unsubscribed,
          };
          sessionStorage.setItem(RR_USER, JSON.stringify(updatedRrUser));
          setRrUser(updatedRrUser);
        }
      })
      .catch(console.error);
  }, [pathname, rrUser, user?.email]);

  async function updateSettings(settings: components['schemas']['UserSettings']) {
    // user session expired, redirect to login page
    if (!user?.email) {
      router.push('/');
      return;
    }

    setLoadingSettings(true);

    fetch(`/${Paths.Settings}`, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(settings),
    })
      .then(() => {
        sessionStorage.setItem(
          RR_USER,
          JSON.stringify({
            ...rrUser,
            ...settings,
          }),
        );
      })
      .catch(console.error)
      .finally(() => setLoadingSettings(false));
  }

  return (
    <UserContext
      value={{
        rrUser,
        loadingSettings,
        updateSettings,
      }}
    >
      {children}
    </UserContext>
  );
};

export default UserProvider;
