import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthentication } from "../../../../../../hooks/useAuthentication";
import { useAuthenticationConfig } from "../../../../../../hooks/useAuthenticationConfig";
import { AuthContextProps } from "../../../../../../providers/authentication";
import { TEXT_BODY_400_2_LINES } from "../../../../../../theme/common/typography";
import {
  FluidPaper,
  GridPaper,
} from "../../../../../common/Paper/paper.styles";
import { SectionTitle } from "../../../../../common/Section/components/SectionTitle/sectionTitle";
import { AcceptTerraTOS } from "./components/FormStep/components/AcceptTerraTOS/acceptTerraTOS";
import { ConnectTerraToNIHAccount } from "./components/FormStep/components/ConnectTerraToNIHAccount/connectTerraToNIHAccount";
import { CreateTerraAccount } from "./components/FormStep/components/CreateTerraAccount/createTerraAccount";
import { Section, SectionContent } from "./terraSetUpForm.styles";

interface OnboardingStatus {
  active: boolean;
  completed: boolean;
}

enum ONBOARDING_STEP {
  COMPLETE = 0,
  NIH_ACCOUNT = 3,
  TERRA_ACCOUNT = 1,
  TERRA_TOS = 2,
}

export const TerraSetUpForm = (): JSX.Element | null => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const authentication = useAuthentication();
  const { terraAuthConfig } = useAuthenticationConfig();
  const { terraNIHProfileEndpoint } = terraAuthConfig || {};
  const isNIHConfigured = Boolean(terraNIHProfileEndpoint);
  const onboardingStatusByStep = getOnboardingStatusByStep(
    authentication,
    isNIHConfigured
  );
  const isIdleOrPending = isAuthenticationIdleOrPending(authentication);
  const isSuccess = isOnboardingComplete(onboardingStatusByStep);

  useEffect(() => {
    setShowForm(isIdleOrPending ? false : !isSuccess);
  }, [isIdleOrPending, isSuccess]);

  return showForm ? (
    <FluidPaper>
      <GridPaper>
        <Section>
          <SectionContent>
            <SectionTitle title="Complete your setup" />
            <Typography color="ink.light" variant={TEXT_BODY_400_2_LINES}>
              Follow these steps to unlock the full potential of the data
              explorer.
            </Typography>
          </SectionContent>
        </Section>
        <CreateTerraAccount
          active={isStepActive(
            onboardingStatusByStep,
            ONBOARDING_STEP.TERRA_ACCOUNT
          )}
          completed={isStepCompleted(
            onboardingStatusByStep,
            ONBOARDING_STEP.TERRA_ACCOUNT
          )}
          step={ONBOARDING_STEP.TERRA_ACCOUNT}
        />
        <AcceptTerraTOS
          active={isStepActive(
            onboardingStatusByStep,
            ONBOARDING_STEP.TERRA_TOS
          )}
          completed={isStepCompleted(
            onboardingStatusByStep,
            ONBOARDING_STEP.TERRA_TOS
          )}
          isTOSCurrent={authentication.termsOfServiceDetails?.isCurrent}
          step={ONBOARDING_STEP.TERRA_TOS}
        />
        {isNIHConfigured && (
          <ConnectTerraToNIHAccount
            active={isStepActive(
              onboardingStatusByStep,
              ONBOARDING_STEP.NIH_ACCOUNT
            )}
            completed={isStepCompleted(
              onboardingStatusByStep,
              ONBOARDING_STEP.NIH_ACCOUNT
            )}
            step={ONBOARDING_STEP.NIH_ACCOUNT}
          />
        )}
      </GridPaper>
    </FluidPaper>
  ) : null;
};

/**
 * Returns a map of onboarding steps and their completed status.
 * @param authentication - Authentication values.
 * @returns map of onboarding steps and their completed status.
 */
function getCompletedStatusByStep(
  authentication: AuthContextProps
): Map<ONBOARDING_STEP, boolean> {
  const { NIHProfile, termsOfServiceDetails, terraProfile } = authentication;
  const completedByStep = new Map<ONBOARDING_STEP, boolean>();
  completedByStep.set(
    ONBOARDING_STEP.TERRA_ACCOUNT,
    Boolean(terraProfile?.hasTerraAccount)
  );
  completedByStep.set(
    ONBOARDING_STEP.TERRA_TOS,
    Boolean(terraProfile?.tosAccepted && termsOfServiceDetails?.isCurrent)
  );
  completedByStep.set(
    ONBOARDING_STEP.NIH_ACCOUNT,
    Boolean(NIHProfile?.linkedNIHUsername)
  );
  return completedByStep;
}

/**
 * Returns the current step in the onboarding process.
 * @param completedByStep - Map of onboarding steps and their completed status.
 * @returns current step in the onboarding process.
 */
function getCurrentStep(
  completedByStep: Map<ONBOARDING_STEP, boolean>
): ONBOARDING_STEP {
  let currentStep = ONBOARDING_STEP.COMPLETE;
  for (const key of Object.keys(ONBOARDING_STEP).sort()) {
    // The ONBOARDING_STEP (numeric) enum is compiled into an object that stores both forward and reverse mappings.
    // Continue if the value is not numeric.
    if (Number.isNaN(key)) {
      continue;
    }
    const step = Number(key);
    // Explicitly check for false; the map must have a value for the key.
    if (completedByStep.get(step) === false) {
      currentStep = step;
      break;
    }
  }
  return currentStep;
}

/**
 * Returns a map of onboarding steps and their status.
 * @param authentication - Authentication values.
 * @param isNIHConfigured - Boolean indicating if the Terra NIH endpoint is configured.
 * @returns map of onboarding steps and their status.
 */
function getOnboardingStatusByStep(
  authentication: AuthContextProps,
  isNIHConfigured: boolean
): Map<ONBOARDING_STEP, OnboardingStatus> {
  const completedStatusByStep = getCompletedStatusByStep(authentication);
  // Remove the NIH onboarding step, when NIH endpoint is not defined.
  if (!isNIHConfigured) {
    completedStatusByStep.delete(ONBOARDING_STEP.NIH_ACCOUNT);
  }
  const currentStep = getCurrentStep(completedStatusByStep);
  const onboardingStatusByStep = new Map();
  for (const [step, isCompleted] of completedStatusByStep.entries()) {
    onboardingStatusByStep.set(step, {
      active: step === currentStep,
      completed: isCompleted,
    });
  }
  onboardingStatusByStep.set(ONBOARDING_STEP.COMPLETE, {
    active: currentStep === 0,
    completed: currentStep === 0,
  });
  return onboardingStatusByStep;
}

/**
 * Returns true if authentication is idle, or pending.
 * Idle state is when a user has not logged in (not authenticated).
 * Pending state is when a user is logged in, but the Terra profile or terms of service details are undefined.
 * @param authentication - Authentication values.
 * @returns true if authentication is idle or pending.
 */
function isAuthenticationIdleOrPending(
  authentication: AuthContextProps
): boolean {
  const { isAuthenticated, termsOfServiceDetails, terraProfile } =
    authentication;
  if (!isAuthenticated) {
    return true;
  }
  if (!terraProfile) {
    return true;
  }
  return !termsOfServiceDetails;
}

/**
 * Returns true if onboarding is complete.
 * @param onboardingStatusByStep - Onboarding steps and their status.
 * @returns true if onboarding is complete.
 */
function isOnboardingComplete(
  onboardingStatusByStep: Map<ONBOARDING_STEP, OnboardingStatus>
): boolean {
  return Boolean(onboardingStatusByStep.get(ONBOARDING_STEP.COMPLETE)?.active);
}

/**
 * Returns true if the step is active.
 * @param onboardingStatusByStep - Map of onboarding steps and their status.
 * @param onboardingStep - Onboarding step.
 * @returns true if the step is active.
 */
function isStepActive(
  onboardingStatusByStep: Map<ONBOARDING_STEP, OnboardingStatus>,
  onboardingStep: ONBOARDING_STEP
): boolean {
  return onboardingStatusByStep.get(onboardingStep)?.active || false;
}

/**
 * Returns true if the step is completed.
 * @param onboardingStatusByStep - Map of onboarding steps and their status.
 * @param onboardingStep - Onboarding step.
 * @returns true if the step is completed.
 */
function isStepCompleted(
  onboardingStatusByStep: Map<ONBOARDING_STEP, OnboardingStatus>,
  onboardingStep: ONBOARDING_STEP
): boolean {
  return onboardingStatusByStep.get(onboardingStep)?.completed || false;
}
