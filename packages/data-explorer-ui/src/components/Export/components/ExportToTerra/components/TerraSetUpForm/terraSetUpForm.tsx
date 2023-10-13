import { Typography } from "@mui/material";
import React from "react";
import { useAuthentication } from "../../../../../../hooks/useAuthentication";
import {
  NIHProfile,
  TerraProfile,
} from "../../../../../../providers/authentication";
import { TEXT_BODY_400_2_LINES } from "../../../../../../theme/common/typography";
import {
  GridPaper,
  RoundedPaper,
} from "../../../../../common/Paper/paper.styles";
import { SectionTitle } from "../../../../../common/Section/components/SectionTitle/sectionTitle";
import { AcceptTerraTOS } from "./components/FormStep/components/AcceptTerraTOS/acceptTerraTOS";
import { ConnectTerraToNIHAccount } from "./components/FormStep/components/ConnectTerraToNIHAccount/connectTerraToNIHAccount";
import { CreateTerraAccount } from "./components/FormStep/components/CreateTerraAccount/createTerraAccount";
import { NIHAccountExpiryWarning } from "./components/NIHAccountExpiryWarning/nihAccountExpiryWarning";
import { Section, SectionContent } from "./terraSetUpForm.styles";

enum ONBOARDING_STEP {
  COMPLETE = 0,
  NIH_ACCOUNT = 3,
  TERRA_ACCOUNT = 1,
  TERRA_TOS = 2,
}

export const TerraSetUpForm = (): JSX.Element | null => {
  const { isAuthenticated, NIHProfile, terraProfile } = useAuthentication();
  const { linkExpired, linkExpireTime, linkWillExpire } = NIHProfile || {};
  const step = getCurrentStep(terraProfile, NIHProfile);
  const isSetUpComplete = isAuthenticated && step === ONBOARDING_STEP.COMPLETE;
  return !isAuthenticated || !terraProfile ? null : isSetUpComplete ? (
    <NIHAccountExpiryWarning
      linkExpired={linkExpired}
      linkExpireTime={linkExpireTime}
      linkWillExpire={linkWillExpire}
    />
  ) : (
    <RoundedPaper>
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
          active={step === ONBOARDING_STEP.TERRA_ACCOUNT}
          completed={step > ONBOARDING_STEP.TERRA_ACCOUNT}
          step={ONBOARDING_STEP.TERRA_ACCOUNT}
        />
        <AcceptTerraTOS
          active={step === ONBOARDING_STEP.TERRA_TOS}
          completed={step > ONBOARDING_STEP.TERRA_TOS}
          step={ONBOARDING_STEP.TERRA_TOS}
        />
        <ConnectTerraToNIHAccount
          active={step === ONBOARDING_STEP.NIH_ACCOUNT}
          completed={step > ONBOARDING_STEP.NIH_ACCOUNT}
          step={ONBOARDING_STEP.NIH_ACCOUNT}
        />
      </GridPaper>
    </RoundedPaper>
  );
};

/**
 * Returns the current step in the onboarding process.
 * @param terraProfile - Terra profile.
 * @param NIHProfile - NIH profile.
 * @returns current step in the onboarding process.
 */
function getCurrentStep(
  terraProfile?: TerraProfile,
  NIHProfile?: NIHProfile
): ONBOARDING_STEP {
  if (!terraProfile?.hasTerraAccount) {
    return ONBOARDING_STEP.TERRA_ACCOUNT;
  }
  if (!terraProfile?.tosAccepted) {
    return ONBOARDING_STEP.TERRA_TOS;
  }
  if (!NIHProfile?.linkedNIHUsername) {
    return ONBOARDING_STEP.NIH_ACCOUNT;
  }
  return ONBOARDING_STEP.COMPLETE;
}
