import {
  AuthenticationEndpointResponse,
  AuthenticationResponse,
  AUTHENTICATION_STATUS,
  RESPONSE_STATUS,
} from "./common/entities";
import { GoogleEndpointResponse } from "./useFetchGoogleProfile";
import { TerraNIHEndpointResponse } from "./useFetchTerraNIHProfile";
import { TerraEndpointResponse } from "./useFetchTerraProfile";
import { TerraTermsOfServiceEndpointResponse } from "./useFetchTerraTermsOfService";

/**
 * Handles the status of the authentication process.
 * @param userProfileResponse - User profile response.
 * @param terraProfileResponse - Terra profile response.
 * @param terraTOSResponse - Terra terms of service response.
 * @param terraNIHProfileResponse - Terra NIH profile response.
 * @returns authentication status.
 */
export const useAuthenticationStatus = (
  userProfileResponse: AuthenticationResponse<GoogleEndpointResponse>,
  terraProfileResponse: AuthenticationResponse<TerraEndpointResponse>,
  terraTOSResponse: AuthenticationResponse<TerraTermsOfServiceEndpointResponse>,
  terraNIHProfileResponse: AuthenticationResponse<TerraNIHEndpointResponse>
): AUTHENTICATION_STATUS => {
  return getAuthenticationStatus([
    terraNIHProfileResponse,
    terraProfileResponse,
    terraTOSResponse,
    userProfileResponse,
  ]);
};

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
