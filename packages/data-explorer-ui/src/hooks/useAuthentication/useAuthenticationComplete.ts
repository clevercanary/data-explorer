import Router, { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import { ROUTE_LOGIN } from "../../providers/authentication";
import { AUTHENTICATION_STATUS } from "./common/entities";

/**
 * Handles the completion of the authentication process.
 * @param status - Authentication status.
 */
export const useAuthenticationComplete = (
  status: AUTHENTICATION_STATUS
): void => {
  const { asPath } = useRouter();
  const routeHistoryRef = useRef<string>(initRouteHistory(asPath));

  // Maintain a history of routes that have been visited prior to authentication.
  routeHistoryRef.current = useMemo(
    () => updateRouteHistory(routeHistoryRef.current, asPath),
    [asPath]
  );

  // Redirect to the previous route after authentication is completed.
  useEffect(() => {
    if (status === AUTHENTICATION_STATUS.COMPLETED) {
      Router.push(routeHistoryRef.current);
    }
  }, [status]);
};

/**
 * Initializes route history with the current path.
 * Returns base path if current path is the login route.
 * @param path - current browser path.
 * @returns path to be used as the initial route history.
 */
function initRouteHistory(path: string): string {
  return path === ROUTE_LOGIN ? "/" : path;
}

/**
 * Updates route history with the current path, unless the current path is the LoginView page.
 * @param prevPath - route history path.
 * @param path - current browser path.
 * @returns updated path to be used as the route history.
 */
function updateRouteHistory(prevPath: string, path: string): string {
  if (path !== ROUTE_LOGIN) {
    return path;
  }
  return prevPath;
}
