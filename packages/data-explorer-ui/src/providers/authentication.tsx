import Router, { useRouter } from "next/router";
import React, { createContext, ReactNode, useCallback } from "react";
import { useIdleTimer } from "react-idle-timer";
import { DEFAULT_RESPONSE } from "../hooks/useAuthentication/common/constants";
import {
  AuthenticationEndpointResponse,
  AuthenticationResponse,
  AUTHENTICATION_STATUS,
  RESPONSE_STATUS,
} from "../hooks/useAuthentication/common/entities";
import { useAuthenticationComplete } from "../hooks/useAuthentication/useAuthenticationComplete";
import {
  useFetchGoogleProfile,
  UserProfile,
} from "../hooks/useAuthentication/useFetchGoogleProfile";
import {
  TerraNIHEndpointResponse,
  useFetchTerraNIHProfile,
} from "../hooks/useAuthentication/useFetchTerraNIHProfile";
import {
  TerraEndpointResponse,
  useFetchTerraProfile,
} from "../hooks/useAuthentication/useFetchTerraProfile";
import {
  TerraTermsOfServiceEndpointResponse,
  useFetchTerraTermsOfService,
} from "../hooks/useAuthentication/useFetchTerraTermsOfService";
import { useTokenClient } from "../hooks/useAuthentication/useTokenClient";
import { useConfig } from "../hooks/useConfig";
import { INACTIVITY_PARAM } from "../hooks/useSessionTimeout";

// Template constants
export const ROUTE_LOGIN = "/login";

type AuthenticateUserFn = () => void;
type RequestAuthenticationFn = () => void;

/**
 * Model of authentication context.
 */
export interface AuthContextProps {
  authenticateUser: AuthenticateUserFn;
  isAuthenticated: boolean;
  requestAuthentication: RequestAuthenticationFn;
  status: AUTHENTICATION_STATUS;
  terraNIHProfileResponse: AuthenticationResponse<TerraNIHEndpointResponse>;
  terraProfileResponse: AuthenticationResponse<TerraEndpointResponse>;
  terraTOSResponse: AuthenticationResponse<TerraTermsOfServiceEndpointResponse>;
  token?: string;
  userProfile?: UserProfile;
}

/**
 * Auth context for storing and using auth-related state.
 */
export const AuthContext = createContext<AuthContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  authenticateUser: () => {},
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  requestAuthentication: () => {},
  status: AUTHENTICATION_STATUS.NOT_STARTED,
  terraNIHProfileResponse:
    DEFAULT_RESPONSE as AuthenticationResponse<TerraNIHEndpointResponse>,
  terraProfileResponse:
    DEFAULT_RESPONSE as AuthenticationResponse<TerraEndpointResponse>,
  terraTOSResponse:
    DEFAULT_RESPONSE as AuthenticationResponse<TerraTermsOfServiceEndpointResponse>,
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
  const { config } = useConfig();
  const { redirectRootToPath } = config;
  const { basePath } = useRouter();
  const { token, tokenClient } = useTokenClient();
  const terraNIHProfileResponse = useFetchTerraNIHProfile(token);
  const terraProfileResponse = useFetchTerraProfile(token);
  const terraTOSResponse = useFetchTerraTermsOfService(token);
  const userProfileResponse = useFetchGoogleProfile(token);
  const isAuthenticated = userProfileResponse.isSuccess;
  const releaseToken = terraTOSResponse.isSuccess;
  const status = getAuthenticationStatus([
    terraNIHProfileResponse,
    terraProfileResponse,
    terraTOSResponse,
    userProfileResponse,
  ]);

  // Handle completion of authentication process.
  useAuthenticationComplete(status);

  /**
   * If sessionTimeout is set and user is authenticated, the app will reload and redirect to
   * origin, including base path, root path, and query param.
   */
  useIdleTimer({
    onIdle: () =>
      isAuthenticated &&
      sessionTimeout &&
      (window.location.href =
        window.location.origin +
        basePath +
        redirectRootToPath +
        "?" +
        `${INACTIVITY_PARAM}=true`),
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

  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        isAuthenticated,
        requestAuthentication,
        status,
        terraNIHProfileResponse,
        terraProfileResponse,
        terraTOSResponse,
        token: releaseToken ? token : undefined,
        userProfile: userProfileResponse.response,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Returns the authentication status ("NOT STARTED" or "COMPLETE").
 * @param responses - Authentication responses.
 * @returns authentication status.
 */
function getAuthenticationStatus(
  responses: AuthenticationResponse<AuthenticationEndpointResponse>[]
): AUTHENTICATION_STATUS {
  for (const response of responses) {
    if (response.status === RESPONSE_STATUS.NOT_STARTED) {
      return AUTHENTICATION_STATUS.NOT_STARTED;
    }
  }
  return AUTHENTICATION_STATUS.COMPLETED;
}
