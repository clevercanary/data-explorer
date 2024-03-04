import Router, { useRouter } from "next/router";
import React, { createContext, ReactNode, useCallback } from "react";
import { useIdleTimer } from "react-idle-timer";
import { DEFAULT_RESPONSE } from "../hooks/useAuthentication/common/constants";
import {
  AuthenticationResponse,
  AUTHENTICATION_STATUS,
  RESPONSE_STATUS,
} from "../hooks/useAuthentication/common/entities";
import { useAuthenticationComplete } from "../hooks/useAuthentication/useAuthenticationComplete";
import { useAuthenticationStatus } from "../hooks/useAuthentication/useAuthenticationStatus";
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
  isEnabled: boolean;
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
  isEnabled: true,
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
  const { authentication, redirectRootToPath } = config;
  const { basePath } = useRouter();
  const { token, tokenClient } = useTokenClient();
  const terraNIHProfileResponse = useFetchTerraNIHProfile(token);
  const terraProfileResponse = useFetchTerraProfile(token);
  const terraTOSResponse = useFetchTerraTermsOfService(token);
  const userProfileResponse = useFetchGoogleProfile(token);
  const isEnabled = Boolean(authentication);
  const isAuthenticated = userProfileResponse.isSuccess;
  const releaseToken = shouldReleaseToken(
    userProfileResponse,
    terraProfileResponse,
    terraTOSResponse
  );
  const status = useAuthenticationStatus(
    userProfileResponse,
    terraProfileResponse,
    terraTOSResponse,
    terraNIHProfileResponse
  );

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
        isEnabled,
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
 * Token is released for the following conditions:
 * - Terra endpoint is configured and the terms of service response is successful, or
 * - Terra endpoint is not configured and the user profile response is successful.
 * @param userProfileResponse - User profile response.
 * @param terraProfileResponse - Terra profile response.
 * @param terraTOSResponse - Terra terms of service response.
 * @returns true if the token should be released.
 */
function shouldReleaseToken(
  userProfileResponse: AuthenticationResponse<UserProfile>,
  terraProfileResponse: AuthenticationResponse<TerraEndpointResponse>,
  terraTOSResponse: AuthenticationResponse<TerraTermsOfServiceEndpointResponse>
): boolean {
  if (terraProfileResponse.status === RESPONSE_STATUS.NOT_SUPPORTED) {
    return userProfileResponse.isSuccess;
  }
  return terraTOSResponse.isSuccess;
}
