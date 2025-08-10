import React, { createContext, useContext } from 'react';

import { components } from '@/types/schema';

export type TRrUser = {
  spotifyEnabled: boolean;
  lastfmUsername: string;
  fetchedScrapers: boolean;
  unsubscribed: boolean;
  notifyIntervalDays: number;
  fetchedSettings: boolean;
};

interface UserContextType {
  rrUser: TRrUser;
  loadingSettings: boolean;
  updateSettings: (settings: components['schemas']['UserSettings']) => void;
}

export const UserContext: React.Context<UserContextType> = createContext<UserContextType>(
  undefined as unknown as UserContextType,
);
UserContext.displayName = 'UserContext';

export function useUserContext() {
  return useContext(UserContext);
}
