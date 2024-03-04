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

interface DatasetPermission {
  authorized: boolean;
  name: string;
}

type Response = AuthenticationResponse<TerraNIHEndpointResponse>;

export interface TerraNIHEndpointResponse {
  datasetPermissions: DatasetPermission[];
  linkedNihUsername: string;
  linkExpireTime: number;
}

/**
 * Returns Terra NIH account from configured endpoint.
 * @param token - Token.
 * @returns Terra NIH account response.
 */
export const useFetchTerraNIHProfile = (token?: string): Response => {
  const authenticationConfig = useAuthenticationConfig();
  const { terraAuthConfig: { terraNIHProfileEndpoint: endpoint } = {} } =
    authenticationConfig;
  const [response, setResponse] = useState<Response>(
    initResponseState(endpoint) as Response
  );

  // Fetch Terra NIH account profile.
  const fetchEndpointData = useCallback(
    (endpoint: string, accessToken: string): void => {
      fetch(endpoint, getAuthenticationRequestOptions(accessToken))
        .then((response) => response.json())
        .then((response: EndpointResponseError | TerraNIHEndpointResponse) => {
          if (isResponseError(response)) {
            setResponse(DEFAULT_FAILURE_RESPONSE as Response);
          } else {
            setResponse({
              isSuccess: isResponseSuccess(response),
              response,
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

  // Fetches Terra NIH account profile.
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
  response: TerraNIHEndpointResponse | EndpointResponseError
): response is EndpointResponseError {
  return Boolean((response as EndpointResponseError).statusCode);
}

/**
 * Returns true if the user accepted terms of service version is current.
 * @param response - Response.
 * @returns true if response is successful.
 */
function isResponseSuccess(response: TerraNIHEndpointResponse): boolean {
  return Boolean(response.linkedNihUsername);
}
