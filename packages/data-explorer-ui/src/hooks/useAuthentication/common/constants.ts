import {
  AuthenticationEndpointResponse,
  AuthenticationResponse as Response,
  RESPONSE_STATUS,
} from "./entities";

export const DEFAULT_RESPONSE: Response<AuthenticationEndpointResponse> = {
  isSuccess: false,
  response: undefined,
  status: RESPONSE_STATUS.NOT_STARTED,
};

export const DEFAULT_FAILURE_RESPONSE: Response<AuthenticationEndpointResponse> =
  {
    isSuccess: false,
    response: undefined,
    status: RESPONSE_STATUS.FAILED,
  };

export const ENDPOINT_NOT_SUPPORTED_RESPONSE: Response<AuthenticationEndpointResponse> =
  {
    isSuccess: false,
    response: undefined,
    status: RESPONSE_STATUS.NOT_SUPPORTED,
  };
