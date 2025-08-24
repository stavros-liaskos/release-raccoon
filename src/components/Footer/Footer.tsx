import Link from 'next/link';
import React from 'react';

import { footerI18n } from '@/i18n';

import Github from '../Icons/github';

const Footer: React.FunctionComponent = () => {
  if (!footerI18n?.powered) {
    return null;
  }

  return (
    <footer className="flex items-center justify-between flex-none h-16 px-4 border-t-2 rr-border">
      <div />
      <a
        className="flex items-center rr-text"
        href="https://github.com/jaivalis/release-raccoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        {footerI18n.powered}
        <div className="mx-2">
          <Github />
        </div>
      </a>
      <Link href="/support" className="rr-text mr-4">
        Support
      </Link>
    </footer>
  );
};
export default Footer;
