import { GoogleEndpointResponse } from "../useFetchGoogleProfile";
import { TerraNIHEndpointResponse } from "../useFetchTerraNIHProfile";
import { TerraEndpointResponse } from "../useFetchTerraProfile";
import { TerraTermsOfServiceEndpointResponse } from "../useFetchTerraTermsOfService";

export type AuthenticationEndpointResponse =
  | GoogleEndpointResponse
  | TerraEndpointResponse
  | TerraNIHEndpointResponse
  | TerraTermsOfServiceEndpointResponse;

export interface AuthenticationResponse<T> {
  isSuccess: boolean;
  response: T | undefined;
  status: RESPONSE_STATUS;
}

/**
 * Possible set of authentication status values.
 */
export enum AUTHENTICATION_STATUS {
  COMPLETED = "COMPLETED",
  NOT_STARTED = "NOT_STARTED",
}

export interface EndpointResponseError {
  message: string;
  source: string;
  statusCode: number;
}

/**
 * Possible set of response status values.
 */
export enum RESPONSE_STATUS {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  NOT_STARTED = "NOT_STARTED",
  NOT_SUPPORTED = "NOT_SUPPORTED",
}
