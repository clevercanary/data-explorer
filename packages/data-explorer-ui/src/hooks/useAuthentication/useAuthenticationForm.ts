import { AuthContextProps } from "../../providers/authentication";
import {
  AuthenticationEndpointResponse,
  AuthenticationResponse,
  AUTHENTICATION_STATUS,
  RESPONSE_STATUS,
} from "./common/entities";
import { useAuthentication } from "./useAuthentication";

export interface OnboardingStatus {
  active: boolean;
  completed: boolean;
}

export enum ONBOARDING_STEP {
  NIH_ACCOUNT = 3,
  TERRA_ACCOUNT = 1,
  TERRA_TOS = 2,
}

interface UseAuthenticationForm {
  isComplete: boolean;
  isReady: boolean;
  onboardingStatusByStep: Map<ONBOARDING_STEP, OnboardingStatus>;
}

/**
 * Handles authentication form onboarding.
 * @returns onboarding steps and corresponding status.
 */
export const useAuthenticationForm = (): UseAuthenticationForm => {
  const authentication = useAuthentication();
  const isReady = authentication.status === AUTHENTICATION_STATUS.COMPLETED;
  const responses = concatResponses(authentication).filter(filterResponse);
  const onboardingStatusByStep = getOnboardingStatusByStep(responses);
  const isComplete = isAuthenticationComplete(onboardingStatusByStep);
  return {
    isComplete,
    isReady,
    onboardingStatusByStep,
  };
};

/**
 * Returns true if all authentication steps are complete.
 * @param onboardingStatusByStep - Onboarding status by step.
 * @returns true if all authentication steps are complete.
 */
function isAuthenticationComplete(
  onboardingStatusByStep: Map<ONBOARDING_STEP, OnboardingStatus>
): boolean {
  for (const { completed } of onboardingStatusByStep.values()) {
    if (!completed) {
      return false;
    }
  }
  return true;
}

/**
 * Returns all authentication responses, ordered by onboarding step.
 * @param authentication - Authentication.
 * @returns authentication responses.
 */
function concatResponses(
  authentication: AuthContextProps
): AuthenticationResponse<AuthenticationEndpointResponse>[] {
  const { terraNIHProfileResponse, terraProfileResponse, terraTOSResponse } =
    authentication;
  return [terraProfileResponse, terraTOSResponse, terraNIHProfileResponse];
}

/**
 * Returns true if response is not supported.
 * @param response - Response.
 * @returns true if response is not supported.
 */
function filterResponse(
  response: AuthenticationResponse<AuthenticationEndpointResponse>
): boolean {
  return response.status !== RESPONSE_STATUS.NOT_SUPPORTED;
}

/**
 * Returns a map of onboarding steps and their status.
 * @param responses - Authentication responses.
 * @returns map of onboarding steps and their status.
 */
function getOnboardingStatusByStep(
  responses: AuthenticationResponse<AuthenticationEndpointResponse>[]
): Map<ONBOARDING_STEP, OnboardingStatus> {
  const onboardingStatusByStep = new Map();
  for (let i = 0; i < responses.length; i++) {
    const { isSuccess } = responses[i];
    onboardingStatusByStep.set(i + 1, {
      active: isStepActive(isSuccess, onboardingStatusByStep),
      completed: isSuccess,
    });
  }
  return onboardingStatusByStep;
}

/**
 * Returns true if step is active.
 * @param isSuccess - Response is successful.
 * @param onboardingStatusByStep - Onboarding status by step.
 * @returns true if step is active.
 */
function isStepActive(
  isSuccess: boolean,
  onboardingStatusByStep: Map<ONBOARDING_STEP, OnboardingStatus>
): boolean {
  for (const { active } of onboardingStatusByStep.values()) {
    if (active) {
      return false;
    }
  }
  return !isSuccess;
}
