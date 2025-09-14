import '@/styles/globals.css';

import React from 'react';

import UserProvider from '@/contexts/User/UserProvider';

export default async function RootLayout({ children }: LayoutProps<'/profile'>) {
  return <UserProvider>{children}</UserProvider>;
}
