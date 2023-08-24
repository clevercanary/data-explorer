import Router, { useRouter } from "next/router";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useIdleTimer } from "react-idle-timer";
import { useConfig } from "../hooks/useConfig";

// Template constants
export const ROUTE_LOGIN = "/login";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- see todo
declare const google: any; // TODO see https://github.com/clevercanary/data-browser/issues/544.

type AuthorizeUserFn = () => void;
type RequestAuthorizationFn = () => void;

/**
 * Model of terra profile.
 */
interface TerraProfile {
  authorized: boolean;
  tosAccepted: boolean;
}

/**
 * Model of token response.
 */
interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  token_type: string;
}

/**
 * Model of user profile.
 */
export interface UserProfile {
  authorized: boolean;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  hd: string;
  locale: string;
  name: string;
  picture: string;
  sub: string;
}

/**
 * Model of authentication context.
 */
export interface AuthContextProps {
  authorizeUser: AuthorizeUserFn;
  isAuthorized: boolean;
  requestAuthorization: RequestAuthorizationFn;
  terraProfile?: TerraProfile;
  token?: string;
  userProfile?: UserProfile;
}

/**
 * Auth context for storing and using auth-related state.
 */
export const AuthContext = createContext<AuthContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  authorizeUser: () => {},
  isAuthorized: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  requestAuthorization: () => {},
  terraProfile: undefined,
  token: undefined,
  userProfile: undefined,
});

interface Props {
  children: ReactNode | ReactNode[];
  sessionTimeout?: number;
}

/**
 * Auth provider for consuming components to subscribe to changes in auth-related state.
 * @param props - Component inputs.
 * @param props.children - Set of children components that can possibly consume the query provider.
 * @param props.sessionTimeout - If provided, will set the value for a session timeout (in milliseconds).
 * @returns Provider element to be used by consumers to both update authentication state and subscribe to changes in authentication state.
 */
export function AuthProvider({ children, sessionTimeout }: Props): JSX.Element {
  const { authentication: authConfig } = useConfig().config;
  const { googleGISAuthConfig } = authConfig || {};
  const { clientId, scope } = googleGISAuthConfig || {};
  const { asPath, basePath } = useRouter();
  const routeHistoryRef = useRef<string>(initRouteHistory(asPath));
  const [token, setToken] = useState<string>();
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any -- see todo
  const [tokenClient, setTokenClient] = useState<any>(); // TODO see https://github.com/clevercanary/data-browser/issues/544.
  const [terraProfile, setTerraProfile] = useState<TerraProfile>();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const isAuthorized = Boolean(userProfile?.authorized);

  /**
   * If sessionTimeout is set and user is authorized, the app will reload and redirect to
   * origin (including basePath)
   */
  useIdleTimer({
    onIdle: () =>
      isAuthorized &&
      sessionTimeout &&
      (window.location.href = window.location.origin + basePath),
    timeout: sessionTimeout,
  });

  /**
   * Requests access token and authorizes user.
   */
  const authorizeUser = useCallback((): void => {
    tokenClient.requestAccessToken();
  }, [tokenClient]);

  /**
   * Navigates to login page.
   */
  const requestAuthorization = useCallback((): void => {
    Router.push(ROUTE_LOGIN);
  }, []);

  /**
   * Fetches google user profile, and on success, redirects user to the previous route.
   */
  const fetchGoogleProfile = useCallback(
    (endpoint: string, accessToken: string): void => {
      const headers = new Headers();
      headers.append("authorization", "Bearer " + accessToken);
      const options = { headers };
      fetch(endpoint, options)
        .then((response) => response.json())
        .then((profile) => {
          setUserProfile({ authorized: true, ...profile });
          Router.push(routeHistoryRef.current);
        })
        .catch((err) => {
          console.log(err); // TODO handle error.
          setUserProfile(undefined);
        });
    },
    []
  );

  /**
   * Fetches terra user profile.
   */
  const fetchTerraProfile = useCallback(
    (endpoint: string, accessToken: string): void => {
      const headers = new Headers();
      headers.append("authorization", "Bearer " + accessToken);
      const options = { headers };
      fetch(endpoint, options)
        .then((response) => response.json())
        .then(({ enabled: { google, tosAccepted } }) => {
          setTerraProfile({
            authorized: Boolean(google),
            tosAccepted: Boolean(tosAccepted),
          });
        })
        .catch((err) => {
          console.log(err); // TODO handle error.
          setTerraProfile({ authorized: false, tosAccepted: false });
        });
    },
    []
  );

  // Initializes token client - (authorization client id must be configured).
  useEffect(() => {
    if (clientId) {
      setTokenClient(
        google.accounts.oauth2.initTokenClient({
          callback: (tokenResponse: TokenResponse) => {
            const access_token = tokenResponse.access_token;
            setToken(access_token);
          },
          client_id: clientId,
          scope,
        })
      );
    }
  }, [clientId, scope]);

  // Fetches profiles and sets userProfile and terraProfile state when token is retrieved.
  useEffect(() => {
    if (googleGISAuthConfig && token) {
      fetchGoogleProfile(googleGISAuthConfig.googleProfileEndpoint, token);
      fetchTerraProfile(googleGISAuthConfig.terraProfileEndpoint, token);
    }
  }, [googleGISAuthConfig, fetchGoogleProfile, fetchTerraProfile, token]);

  // Route history ref is updated with the previous route path.
  useEffect(() => {
    if (asPath !== ROUTE_LOGIN) {
      // LoginView route omitted; once authorization is successful, the router redirects back to the
      // path prior to logging in.
      routeHistoryRef.current = asPath;
    }
  }, [asPath]);

  return (
    <AuthContext.Provider
      value={{
        authorizeUser,
        isAuthorized,
        requestAuthorization,
        terraProfile,
        token,
        userProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Initializes route history with the current route path.
 * Returns base path if current route path is the login route.
 * @param path - current browser path.
 * @returns path to be used as the initial route history.
 */
function initRouteHistory(path: string): string {
  return path === ROUTE_LOGIN ? "/" : path;
}
