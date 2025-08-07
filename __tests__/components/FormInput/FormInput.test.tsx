import { act, fireEvent, render } from '@testing-library/react';

import FormInput from '@/components/FollowedArtistList/components/FormInput/FormInput';
import { formInputI18n } from '@/i18n';

describe('FormInput', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<FormInput />);
  });

  it('calls action onChange event of input', () => {
    const artistName = 'Cabin Crew';
    const handleAction = jest.fn();
    const { getByRole } = render(
      <FormInput handleAction={handleAction} i18n={formInputI18n} actionEventTrigger={'onChange'} />,
    );
    const inputValue = getByRole('textbox');
    act(() => {
      fireEvent.change(inputValue, { target: { value: artistName } });
    });

    expect(handleAction).toHaveBeenCalledWith(artistName);
  });

  it('calls action onSubmit event of form', () => {
    const artistName = 'Cabin Crew';
    const handleAction = jest.fn();
    const { getByRole } = render(
      <FormInput handleAction={handleAction} i18n={formInputI18n} actionEventTrigger={'onSubmit'}>
        <button>Submit</button>
      </FormInput>,
    );
    const inputValue = getByRole('textbox');
    const btn = getByRole('button');
    act(() => {
      fireEvent.change(inputValue, { target: { value: artistName } });
      fireEvent.click(btn);
    });

    expect(inputValue).toHaveValue(artistName);
    expect(handleAction).toHaveBeenCalledWith(artistName);
  });

  it('matches snapshot', () => {
    const { container } = render(
      <FormInput handleAction={jest.fn} i18n={formInputI18n} actionEventTrigger={'onSubmit'} />,
    );
    expect(container).toMatchSnapshot();
  });
});
