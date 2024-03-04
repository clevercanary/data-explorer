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

type Response = AuthenticationResponse<TerraTermsOfServiceEndpointResponse>;

export interface TerraTermsOfServiceEndpointResponse {
  currentVersion: string;
  isEnabled: boolean;
  isGracePeriodEnabled: boolean;
  userAcceptedVersion?: string; // Undefined if user has not accepted terms of service.
}

/**
 * Returns Terra terms of service response from configured endpoint.
 * @param token - Token.
 * @returns Terra terms of service response.
 */
export const useFetchTerraTermsOfService = (token?: string): Response => {
  const authenticationConfig = useAuthenticationConfig();
  const { terraAuthConfig: { termsOfServiceEndpoint: endpoint } = {} } =
    authenticationConfig;
  const [response, setResponse] = useState<Response>(
    initResponseState(endpoint) as Response
  );

  // Fetch Terra terms of service.
  const fetchEndpointData = useCallback(
    (endpoint: string, accessToken: string): void => {
      fetch(endpoint, getAuthenticationRequestOptions(accessToken))
        .then((response) => response.json())
        .then(
          (
            response:
              | EndpointResponseError
              | TerraTermsOfServiceEndpointResponse
          ) => {
            if (isResponseError(response)) {
              setResponse(DEFAULT_FAILURE_RESPONSE as Response);
            } else {
              setResponse({
                isSuccess: isResponseSuccess(response),
                response,
                status: RESPONSE_STATUS.COMPLETED,
              });
            }
          }
        )
        .catch((err) => {
          console.log(err); // TODO handle error.
          setResponse(DEFAULT_FAILURE_RESPONSE as Response);
        });
    },
    []
  );

  // Fetches Terra terms of service.
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
  response: TerraTermsOfServiceEndpointResponse | EndpointResponseError
): response is EndpointResponseError {
  return Boolean((response as EndpointResponseError).statusCode);
}

/**
 * Returns true if the user accepted terms of service version is current.
 * @param response - Response.
 * @returns true if response is successful.
 */
function isResponseSuccess(
  response: TerraTermsOfServiceEndpointResponse
): boolean {
  return Boolean(response.currentVersion === response.userAcceptedVersion);
}
