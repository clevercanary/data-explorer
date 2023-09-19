import { Typography } from "@mui/material";
import React from "react";
import { useAuthentication } from "../../../../../../hooks/useAuthentication";
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

export const TerraSetUpForm = (): JSX.Element | null => {
  const { isAuthenticated, NIHProfile, terraProfile } = useAuthentication();
  const { linkExpireTime, linkWillExpire } = NIHProfile || {};
  const isSetUpComplete =
    isAuthenticated &&
    terraProfile?.hasTerraAccount &&
    terraProfile?.tosAccepted &&
    NIHProfile?.linkedNIHUsername;
  return !isAuthenticated || !terraProfile ? null : isSetUpComplete ? (
    <NIHAccountExpiryWarning
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
          hasTerraAccount={Boolean(terraProfile?.hasTerraAccount)}
        />
        <AcceptTerraTOS
          disabled={!terraProfile?.hasTerraAccount}
          tosAccepted={Boolean(terraProfile?.tosAccepted)}
        />
        <ConnectTerraToNIHAccount
          disabled={
            !(terraProfile?.hasTerraAccount && terraProfile?.tosAccepted)
          }
          linkedNIHAccount={Boolean(NIHProfile?.linkedNIHUsername)}
        />
      </GridPaper>
    </RoundedPaper>
  );
};
