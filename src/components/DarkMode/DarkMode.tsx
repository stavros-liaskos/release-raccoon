'use client';
import React from 'react';

import { useThemeContext } from '../../contexts/Theme/ThemeContext';
import Moon from '../Icons/moon';
import Sun from '../Icons/sun';

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
