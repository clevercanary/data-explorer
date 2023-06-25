import { isSSR } from "../utils/ssr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- The result will be a object containing anything set on the url parameters
type Search = any;
interface Result {
  href: string;
  pathname: string;
  search: Search;
}

/**
 * Hook used to get the url properties from the location object
 * Most of the time you can get the same result with useRouter(). This hook has a single use case:
 *  - When you need to get the url properties ready on the first render, before ReactDOM.hydrate
 * @returns an object containing url's pathname and search params
 */
export const useLocation = (): Result | null => {
  if (isSSR()) {
    return null;
  }

  const { href, pathname, search: locationSearch } = window.location;
  const search = Object.fromEntries(
    new URLSearchParams(locationSearch).entries()
  );
  return {
    href,
    pathname,
    search,
  };
};
