import React from 'react';

import { footerI18n } from '@/i18n';

import Github from '../Icons/github';

const Footer: React.FunctionComponent = () => {
  if (!footerI18n || !footerI18n.powered) {
    return null;
  }

  return (
    <footer className="rr-column flex-none h-16 border-t-2 rr-border justify-center">
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
    </footer>
  );
};
export default Footer;
