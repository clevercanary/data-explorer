import { useCallback, useEffect, useState } from "react";
import { useAuthenticationConfig } from "../useAuthenticationConfig";
import { DEFAULT_FAILURE_RESPONSE, DEFAULT_RESPONSE } from "./common/constants";
import { AuthenticationResponse, RESPONSE_STATUS } from "./common/entities";
import { getAuthenticationRequestOptions } from "./common/utils";

export type UserProfile = GoogleEndpointResponse;

export interface GoogleEndpointResponse {
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

type Response = AuthenticationResponse<GoogleEndpointResponse>;

/**
 * Returns user profile response from configured endpoint.
 * @param token - Token.
 * @returns google profile response.
 */
export const useFetchGoogleProfile = (token?: string): Response => {
  const [response, setResponse] = useState<Response>(
    DEFAULT_RESPONSE as Response
  );
  const authenticationConfig = useAuthenticationConfig();
  const { googleGISAuthConfig: { googleProfileEndpoint: endpoint } = {} } =
    authenticationConfig;

  // Fetch google user profile.
  const fetchEndpointData = useCallback(
    (endpoint: string, accessToken: string): void => {
      fetch(endpoint, getAuthenticationRequestOptions(accessToken))
        .then((response) => response.json())
        .then((profile: GoogleEndpointResponse) => {
          setResponse({
            isSuccess: true,
            response: profile,
            status: RESPONSE_STATUS.COMPLETED,
          });
        })
        .catch((err) => {
          console.log(err); // TODO handle error.
          setResponse(DEFAULT_FAILURE_RESPONSE as Response);
        });
    },
    []
  );

  // Fetches user profile.
  useEffect(() => {
    if (!token) return;
    if (!endpoint) return;
    fetchEndpointData(endpoint, token);
  }, [endpoint, fetchEndpointData, token]);

  return response;
};
