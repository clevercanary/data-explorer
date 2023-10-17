import Router, { useRouter } from "next/router";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useIdleTimer } from "react-idle-timer";
import { useConfig } from "../hooks/useConfig";

// Template constants
export const ROUTE_LOGIN = "/login";
const SECONDS_PER_WEEK = 60 * 60 * 24 * 7; // 7 days.

// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- see todo
declare const google: any; // TODO see https://github.com/clevercanary/data-browser/issues/544.

type AuthenticateUserFn = () => void;
type RequestAuthenticationFn = () => void;

/**
 * Model of NIH profile.
 */
export interface NIHProfile {
  linkedNIHUsername: string;
  linkExpired: boolean;
  linkExpireTime: number;
  linkWillExpire: boolean;
}

export interface TermsOfServiceDetails {
  currentVersion: string;
  isCurrent: boolean;
  isEnabled: boolean;
  isGracePeriodEnabled: boolean;
  userAcceptedVersion: string;
}

/**
 * Model of terra profile.
 */
export interface TerraProfile {
  hasTerraAccount: boolean;
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
  authenticated: boolean;
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
  authenticateUser: AuthenticateUserFn;
  isAuthenticated: boolean;
  NIHProfile?: NIHProfile;
  requestAuthentication: RequestAuthenticationFn;
  termsOfServiceDetails?: TermsOfServiceDetails;
  terraProfile?: TerraProfile;
  token?: string;
  userProfile?: UserProfile;
}

/**
 * Auth context for storing and using auth-related state.
 */
export const AuthContext = createContext<AuthContextProps>({
  NIHProfile: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  authenticateUser: () => {},
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  requestAuthentication: () => {},
  termsOfServiceDetails: undefined,
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
  const { googleGISAuthConfig, terraAuthConfig } = authConfig || {};
  const { clientId, scope } = googleGISAuthConfig || {};
  const { asPath, basePath } = useRouter();
  const routeHistoryRef = useRef<string>(initRouteHistory(asPath));
  const [token, setToken] = useState<string>();
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any -- see todo
  const [tokenClient, setTokenClient] = useState<any>(); // TODO see https://github.com/clevercanary/data-browser/issues/544.
  const [NIHProfile, setNIHProfile] = useState<NIHProfile>();
  const [terraProfile, setTerraProfile] = useState<TerraProfile>();
  const [termsOfServiceDetails, setTermsOfServiceDetails] =
    useState<TermsOfServiceDetails>();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const isAuthenticated = Boolean(userProfile?.authenticated);
  routeHistoryRef.current = useMemo(
    () => updateRouteHistory(routeHistoryRef.current, asPath),
    [asPath]
  );
  const releaseToken =
    terraProfile?.tosAccepted && termsOfServiceDetails?.isCurrent;

  /**
   * If sessionTimeout is set and user is authenticated, the app will reload and redirect to
   * origin (including basePath)
   */
  useIdleTimer({
    onIdle: () =>
      isAuthenticated &&
      sessionTimeout &&
      (window.location.href = window.location.origin + basePath),
    timeout: sessionTimeout,
  });

  /**
   * Requests access token and authenticates user.
   */
  const authenticateUser = useCallback((): void => {
    tokenClient.requestAccessToken();
  }, [tokenClient]);

  /**
   * Navigates to login page.
   */
  const requestAuthentication = useCallback((): void => {
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
          setUserProfile({ authenticated: true, ...profile });
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
        .then((response) => {
          const hasTerraAccount = Boolean(response?.enabled?.google);
          const tosAccepted = Boolean(response?.enabled?.tosAccepted);
          setTerraProfile({
            hasTerraAccount,
            tosAccepted,
          });
        })
        .catch((err) => {
          console.log(err); // TODO handle error.
          setTerraProfile({ hasTerraAccount: false, tosAccepted: false });
        });
    },
    []
  );

  /**
   * Fetches Terra NIH user profile.
   */
  const fetchTerraNIHProfile = useCallback(
    (endpoint: string, accessToken: string): void => {
      const headers = new Headers();
      headers.append("authorization", "Bearer " + accessToken);
      const options = { headers };
      fetch(endpoint, options)
        .then((response) => response.json())
        .then((profile) => {
          if (profile.linkedNihUsername) {
            setNIHProfile({
              linkExpireTime: profile.linkExpireTime,
              linkExpired: hasLinkedNIHAccountExpired(profile.linkExpireTime),
              linkWillExpire: isLinkedNIHAccountWillExpire(
                profile.linkExpireTime
              ),
              linkedNIHUsername: profile.linkedNihUsername,
            });
          }
        })
        .catch((err) => {
          console.log(err); // TODO handle error.
          setNIHProfile(undefined);
        });
    },
    []
  );

  /**
   * Fetches terra profile terms of service.
   */
  const fetchTerraTermsOfService = useCallback(
    (endpoint: string, accessToken: string): void => {
      const headers = new Headers();
      headers.append("authorization", "Bearer " + accessToken);
      const options = { headers };
      fetch(endpoint, options)
        .then((response) => response.json())
        .then((response) => {
          if (response.userAcceptedVersion) {
            setTermsOfServiceDetails({
              ...response,
              isCurrent: isTermsOfServiceCurrent(response),
            });
          }
        })
        .catch((err) => {
          console.log(err); // TODO handle error.
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
    if (token) {
      if (googleGISAuthConfig) {
        fetchGoogleProfile(googleGISAuthConfig.googleProfileEndpoint, token);
      }
      if (terraAuthConfig) {
        fetchTerraProfile(terraAuthConfig.terraProfileEndpoint, token);
        fetchTerraNIHProfile(terraAuthConfig.terraNIHProfileEndpoint, token);
        fetchTerraTermsOfService(terraAuthConfig.termsOfServiceEndpoint, token);
      }
    }
  }, [
    googleGISAuthConfig,
    fetchGoogleProfile,
    fetchTerraNIHProfile,
    fetchTerraProfile,
    fetchTerraTermsOfService,
    terraAuthConfig,
    token,
  ]);

  return (
    <AuthContext.Provider
      value={{
        NIHProfile,
        authenticateUser,
        isAuthenticated,
        requestAuthentication,
        termsOfServiceDetails,
        terraProfile,
        token: releaseToken ? token : undefined,
        userProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Calculates the remaining time in seconds until the given expiration time.
 * @param expireTime - Expire time in seconds.
 * @returns remaining time in seconds.
 */
export function expireTimeInSeconds(expireTime: number): number {
  return expireTime - Date.now() / 1000;
}

/**
 * Returns true if the linked NIH account has expired.
 * @param expireTime - Expire time in seconds.
 * @returns true if the linked NIH account has expired.
 */
function hasLinkedNIHAccountExpired(expireTime: number): boolean {
  return expireTimeInSeconds(expireTime) < 0;
}

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
 * Returns true if the linked NIH account will expire in less than a week.
 * @param expireTime - Expire time in seconds.
 * @returns true if the linked NIH account will expire in less than a week.
 */
function isLinkedNIHAccountWillExpire(expireTime: number): boolean {
  return expireTimeInSeconds(expireTime) < SECONDS_PER_WEEK;
}

/**
 * Returns true if the user accepted terms of service version is current.
 * @param termsOfServiceDetails - Terms of service details.
 * @returns true if the accepted terms of service version is current.
 */
function isTermsOfServiceCurrent(
  termsOfServiceDetails: TermsOfServiceDetails
): boolean {
  return Boolean(
    termsOfServiceDetails.currentVersion ===
      termsOfServiceDetails.userAcceptedVersion
  );
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
