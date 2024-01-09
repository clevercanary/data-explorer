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
