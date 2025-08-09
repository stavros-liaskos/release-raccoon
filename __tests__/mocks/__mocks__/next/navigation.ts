export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
});
export const usePathname = () => '/mock-path';
export const useSearchParams = () => new URLSearchParams();
