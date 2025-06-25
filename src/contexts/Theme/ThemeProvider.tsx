'use client';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const isWindow = () => typeof window !== 'undefined';

interface ChildrenProps {
  children: ReactNode;
}

const ThemeProvider: FC<ChildrenProps> = ({ children }) => {
  const [dark, setDark] = useState<boolean>();
  const [loaded, setLoaded] = useState(false);

  const value = useMemo(() => ({ dark, loaded, setDark }), [dark, loaded]);
  useEffect(() => {
    setDark(isWindow() && localStorage.theme);
    setLoaded(true);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    if (dark) {
      root.classList.add('dark');
      isWindow() && localStorage.setItem('theme', 'dark');
    } else if (dark === false) {
      root.classList.remove('dark');
      isWindow() && localStorage.removeItem('theme');
    }
  }, [dark]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
};

export default ThemeProvider;
