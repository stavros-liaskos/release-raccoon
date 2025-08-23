import Link from 'next/link';
import React from 'react';

import { loginI18n } from '@/i18n';
import { auth0 } from '@/lib/auth0';
import { Auth0Endpoints } from '@/types/endpoints';

import HeroStats from './HeroStats';

const Hero = async () => {
  const session = await auth0.getSession();

  if (
    !loginI18n?.loginBtn ||
    !loginI18n.text ||
    !loginI18n.welcome ||
    !loginI18n.artistsCount ||
    !loginI18n.releasesCount
  ) {
    return null;
  }

  return (
    <div className="flex flex-auto flex-col items-center justify-center w-full">
      <h2 className="rr-text text-center text-4xl mb-3">{loginI18n.welcome}</h2>
      <p className="rr-text text-center text-xl mb-6">{loginI18n.text}</p>

      <div className="mb-8">
        <HeroStats />
      </div>

      {!session ? (
        <a href={Auth0Endpoints.Login}>
          <button className="btn btn-large lg:ml-8 mt-8 mb-24 w-44 h-14">{loginI18n.loginBtn}</button>
        </a>
      ) : (
        <Link href={'/profile'}>
          <button className="btn btn-large lg:ml-8 mt-8 mb-24 w-44 h-14">{loginI18n.goToProfile}</button>
        </Link>
      )}
    </div>
  );
};
export default Hero;
