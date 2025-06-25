'use client';
import React from 'react';
import Sun from '../Icons/sun';
import Moon from '../Icons/moon';
import { useThemeContext } from '../../contexts/Theme/ThemeContext';

const DarkMode: React.FunctionComponent = () => {
  const { dark, loaded, setDark } = useThemeContext();

  return (
    <button onClick={() => setDark(!dark)} data-testid={dark && loaded ? 'sun' : 'moon'} aria-label="toggleDarkMode">
      {dark && loaded ? <Sun /> : <Moon />}
    </button>
  );
};
DarkMode.whyDidYouRender = true;
export default DarkMode;
