import clsx from 'clsx/lite';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface MenuItemProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  danger?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ href, icon, children, danger = false }) => {
  const linkBase = 'flex items-center gap-3 px-4 py-3 rr-text transition-colors';
  const hover = danger
    ? 'hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
    : 'hover:bg-gray-100 dark:hover:bg-gh-dark';
  const linkClassName = `${linkBase} ${hover}`;

  const liDangerClassName = 'border-t border-gray-200 dark:border-gh-border mt-2 pt-2';

  return (
    <li className={clsx(danger ? liDangerClassName : '')}>
      {danger ? (
        <a href={href} className={linkClassName}>
          {icon}
          <span>{children}</span>
        </a>
      ) : (
        <Link href={href} className={linkClassName}>
          {icon}
          <span>{children}</span>
        </Link>
      )}
    </li>
  );
};
