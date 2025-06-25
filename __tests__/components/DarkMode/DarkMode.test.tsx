import React from 'react';
import { act } from '@testing-library/react';
import DarkMode from '@/components/DarkMode/DarkMode';
import { renderWithAct, resetMocks } from '../../testUtils/testUtils';

describe('DarkMode', () => {
  beforeEach(() => {
    resetMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows Sun icon on dark mode', async () => {
    localStorage.setItem('theme', 'dark');
    const component = await renderWithAct(<DarkMode />);
    const { container } = component;

    expect(component.getByTestId('sun')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('shows Moon icon on light mode', async () => {
    localStorage.removeItem('theme');
    const component = await renderWithAct(<DarkMode />);
    const { container } = component;

    expect(component.getByTestId('moon')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('toggles to Sun Icon when clicking the Moon', async () => {
    localStorage.removeItem('theme');
    const component = await renderWithAct(<DarkMode />);
    const button = component.getByTestId('moon');
    expect(component.getByTestId('moon')).toBeTruthy();

    act(() => {
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(component.getByTestId('sun')).toBeTruthy();
  });
});
