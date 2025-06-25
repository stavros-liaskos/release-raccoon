export default function withDelay(cb: () => void, delay = 1000) {
  return setTimeout(() => {
    cb();
  }, delay);
}
