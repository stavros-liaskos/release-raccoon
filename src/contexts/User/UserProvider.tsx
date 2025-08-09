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
    spotify: false,
    lastfm: false,
    fetchedScrapers: false,
    unsubscribed: false,
    notifyIntervalDays: 0,
    fetchedSettings: false,
  });
  const [loadingSettings, setLoadingSettings] = useState(false);

  useEffect(() => {
    if (pathname.includes(NavigationPaths.Profile)) {
      return;
    }
    const rrUserSessionStore = sessionStorage.getItem(RR_USER);
    if (rrUserSessionStore) {
      setRrUser(JSON.parse(rrUserSessionStore));
    }
  }, [pathname, user?.email]);

  // scrapers
  useEffect(() => {
    if (pathname !== NavigationPaths.Profile || rrUser.fetchedScrapers || !user?.email) {
      return;
    }

    fetch(`/${Paths.RaccoonUser}?email=${user.email}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((raccoonUsers: components['schemas']['RaccoonUser'][]) => {
        if (!Array.isArray(raccoonUsers)) {
          return;
        }
        const raccoonUser = raccoonUsers.filter(
          raccoonUser => raccoonUser?.email && raccoonUser.email === user.email,
        )?.[0];
        const isLastFmConnected = !!raccoonUser?.lastfmUsername;
        const isSpotifyConnected = !!raccoonUser?.spotifyEnabled;
        if (rrUser?.spotify !== isSpotifyConnected || rrUser?.lastfm !== isLastFmConnected) {
          const updatedRrUser = {
            ...rrUser,
            spotify: isSpotifyConnected,
            lastfm: isLastFmConnected,
            fetchedScrapers: true,
          };
          sessionStorage.setItem(RR_USER, JSON.stringify(updatedRrUser));
          setRrUser(updatedRrUser);
        }
      })
      .catch(console.error);
  }, [rrUser, user?.email, setRrUser, pathname]);

  // settings
  useEffect(() => {
    if (pathname !== NavigationPaths.Settings || rrUser.fetchedSettings || !user?.email) {
      return;
    }

    setLoadingSettings(true);
    fetch(`/${Paths.Settings}`, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
    })
      .then(res => res.json())
      .then(result => {
        const updatedRrUser = {
          ...rrUser,
          notifyIntervalDays: result?.data?.notifyIntervalDays,
          unsubscribed: result?.data?.unsubscribed,
          fetchedSettings: true,
        };
        sessionStorage.setItem(RR_USER, JSON.stringify(updatedRrUser));
        setRrUser(updatedRrUser);
      })
      .catch(console.error)
      .finally(() => setLoadingSettings(false));
  }, [rrUser, user?.email, setRrUser, pathname]);

  function updateSettings(settings: components['schemas']['UserSettings']) {
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
        const updatedRrUser = {
          ...rrUser,
          ...settings,
          fetchedSettings: true,
        };
        sessionStorage.setItem(RR_USER, JSON.stringify(updatedRrUser));
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
