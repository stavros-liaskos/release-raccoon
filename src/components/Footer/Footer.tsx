import Link from 'next/link';
import React from 'react';

import { footerI18n } from '@/i18n';

const Footer: React.FunctionComponent = () => {
  if (!footerI18n?.copyright) {
    return null;
  }

  return (
    <footer className="flex items-center justify-between flex-none h-16 px-4 border-t-2 rr-border">
      <div />
      <p className="flex items-center rr-text">
        {footerI18n.copyright} {new Date().getFullYear()}
      </p>
      <Link href="/support" className="rr-text mr-4">
        Support
      </Link>
    </footer>
  );
};
export default Footer;
