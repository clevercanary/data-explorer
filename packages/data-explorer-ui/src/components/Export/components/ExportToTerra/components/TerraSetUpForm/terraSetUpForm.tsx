import { Typography } from "@mui/material";
import React from "react";
import {
  OnboardingStatus,
  ONBOARDING_STEP,
  useAuthenticationForm,
} from "../../../../../../hooks/useAuthentication/useAuthenticationForm";
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

export const TerraSetUpForm = (): JSX.Element | null => {
  const { isComplete, isReady, onboardingStatusByStep } =
    useAuthenticationForm();

  if (!isReady) return null;

  return isComplete ? null : (
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
          step={ONBOARDING_STEP.TERRA_TOS}
        />
        {onboardingStatusByStep.has(ONBOARDING_STEP.NIH_ACCOUNT) && (
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
  );
};

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
