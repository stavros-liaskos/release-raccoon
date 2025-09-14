import React from 'react';

import Settings from '@/components/Settings/Settings';

export default async function Page(_: Readonly<PageProps<'/profile/settings'>>) {
  return <Settings />;
}
