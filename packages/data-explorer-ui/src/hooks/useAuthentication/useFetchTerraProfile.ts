import { useCallback, useEffect, useState } from "react";
import { useAuthenticationConfig } from "../useAuthenticationConfig";
import { DEFAULT_FAILURE_RESPONSE } from "./common/constants";
import {
  AuthenticationResponse,
  EndpointResponseError,
  RESPONSE_STATUS,
} from "./common/entities";
import {
  getAuthenticationRequestOptions,
  initResponseState,
} from "./common/utils";

type Response = AuthenticationResponse<TerraEndpointResponse>;

export interface TerraEndpointResponse {
  enabled: TerraEndpointResponseEnabled;
  userInfo: TerraEndpointResponseUserInfo;
}

interface TerraEndpointResponseEnabled {
  adminEnabled: boolean;
  allUsersGroup: boolean;
  google: boolean;
  ldap: boolean;
  tosAccepted: boolean;
}

interface TerraEndpointResponseUserInfo {
  userEmail: string;
  userSubjectId: string;
}

/**
 * Returns Terra profile response from configured endpoint.
 * @param token - Token.
 * @returns Terra profile response.
 */
export const useFetchTerraProfile = (token?: string): Response => {
  const authenticationConfig = useAuthenticationConfig();
  const { terraAuthConfig: { terraProfileEndpoint: endpoint } = {} } =
    authenticationConfig;
  const [response, setResponse] = useState<Response>(
    initResponseState(endpoint) as Response
  );

  // Fetch Terra profile.
  const fetchEndpointData = useCallback(
    (endpoint: string, accessToken: string): void => {
      fetch(endpoint, getAuthenticationRequestOptions(accessToken))
        .then((response) => response.json())
        .then((response: TerraEndpointResponse | EndpointResponseError) => {
          if (isResponseError(response)) {
            setResponse(DEFAULT_FAILURE_RESPONSE as Response);
          } else {
            setResponse({
              isSuccess: isResponseSuccess(response),
              response: response,
              status: RESPONSE_STATUS.COMPLETED,
            });
          }
        })
        .catch((err) => {
          console.log(err); // TODO handle error.
          setResponse(DEFAULT_FAILURE_RESPONSE as Response);
        });
    },
    []
  );

  // Fetches Terra profile.
  useEffect(() => {
    if (!token) return;
    if (!endpoint) return;
    fetchEndpointData(endpoint, token);
  }, [endpoint, fetchEndpointData, token]);

  return response;
};

/**
 * Returns true if response is an error response.
 * @param response - Response.
 * @returns true if response is an error response.
 */
function isResponseError(
  response: TerraEndpointResponse | EndpointResponseError
): response is EndpointResponseError {
  return Boolean((response as EndpointResponseError).statusCode);
}

/**
 * Returns true if response is enabled.
 * @param response - Response.
 * @returns true if response is successful.
 */
function isResponseSuccess(response: TerraEndpointResponse): boolean {
  return Boolean(response.enabled?.google);
}
