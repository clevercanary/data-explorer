import { DEFAULT_RESPONSE, ENDPOINT_NOT_SUPPORTED_RESPONSE } from "./constants";
import {
  AuthenticationEndpointResponse,
  AuthenticationResponse as Response,
} from "./entities";

/**
 * Returns the options for an authentication request.
 * @param token - Token.
 * @returns request options.
 */
export function getAuthenticationRequestOptions(token: string): RequestInit {
  const headers = new Headers();
  headers.append("authorization", "Bearer " + token);
  return { headers };
}

/**
 * Initializes response state.
 * @param endpoint - Endpoint.
 * @returns initial response state.
 */
export function initResponseState(
  endpoint?: string
): Response<AuthenticationEndpointResponse> {
  if (!endpoint) {
    // Endpoint not supported.
    return ENDPOINT_NOT_SUPPORTED_RESPONSE;
  }
  return DEFAULT_RESPONSE;
}
