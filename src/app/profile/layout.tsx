import '@/styles/globals.css';

import React from 'react';

import UserProvider from '@/contexts/User/UserProvider';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <UserProvider>{children}</UserProvider>;
}
