import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button from '@/components/Button/Button';

describe('Button', () => {
  it('renders without data without crashing', () => {
    render(<Button />);
  });

  it('renders an enabled button by default and not a loading spinner', () => {
    const { getByRole, queryByRole } = render(<Button i18n="Click Me!" />);
    const btn = getByRole('button');
    const svg = queryByRole('img');

    expect(btn).not.toHaveAttribute('disabled');
    expect(svg).not.toBeInTheDocument();
  });

  it('disabled button does not call cta on click', () => {
    const clickHandler = jest.fn();

    const { getByRole } = render(<Button i18n="No Action" disabled={true} handleClick={clickHandler} />);
    const btn = getByRole('button');

    expect(clickHandler).not.toHaveBeenCalled();
    expect(btn).toHaveAttribute('disabled');
  });

  it('renders a spinner when loading', () => {
    const { getByRole } = render(<Button i18n="No Action" loading={true} />);
    const svg = getByRole('img');

    expect(svg).toBeInTheDocument();
  });

  it('calls to action when button clicked', () => {
    const clickHandler = jest.fn();
    const { getByRole } = render(<Button i18n="Click Me!" loading={true} handleClick={clickHandler} />);
    const btn = getByRole('button');

    fireEvent.click(btn);

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { container } = render(<Button i18n="Click Me!" loading={true} handleClick={jest.fn} />);
    expect(container).toMatchSnapshot();
  });
});
