import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import ThemeProvider from '@/contexts/Theme/ThemeProvider';
import { useThemeContext } from '@/contexts/Theme/ThemeContext';

describe('ThemeContext', () => {
  afterEach(() => cleanup);

  const ButtonSetDark = () => {
    const { dark, loaded, setDark } = useThemeContext();
    return (
      <div>
        <button onClick={() => setDark(!dark)}>Toggle dark</button>
        <span>Dark theme {dark && loaded ? 'ON' : 'OFF'}</span>
      </div>
    );
  };

  it('toggles dark mode', async () => {
    const { getByText } = render(
      <ThemeProvider>
        <ButtonSetDark />
      </ThemeProvider>,
    );

    await waitFor(() => fireEvent.click(getByText(/Toggle dark/i)));
    expect(getByText('Dark theme ON')).toBeTruthy();

    await waitFor(() => fireEvent.click(getByText(/Toggle dark/i)));
    expect(getByText('Dark theme OFF')).toBeTruthy();
  });
});
