import withDelay from './withDelay';

describe('withDelay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('calls callback with default delay 1000ms', () => {
    const callback = jest.fn();

    withDelay(callback, 1);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1);
    setTimeout(() => {
      expect(callback).toHaveBeenCalledTimes(1);
    }, 2);
  });
});
