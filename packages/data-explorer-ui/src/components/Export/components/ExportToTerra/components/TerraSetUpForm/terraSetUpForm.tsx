import { Typography } from "@mui/material";
import React from "react";
import { useAuthentication } from "../../../../../../hooks/useAuthentication";
import { TEXT_BODY_400_2_LINES } from "../../../../../../theme/common/typography";
import {
  GridPaper,
  RoundedPaper,
} from "../../../../../common/Paper/paper.styles";
import { SectionTitle } from "../../../../../common/Section/components/SectionTitle/sectionTitle";
import { CreateTerraAccount } from "./components/FormStep/components/CreateTerraAccount/createTerraAccount";
import { Section, SectionContent } from "./terraSetUpForm.styles";

export const TerraSetUpForm = (): JSX.Element | null => {
  const { isAuthenticated, terraProfile } = useAuthentication();
  const isSetUpComplete = isAuthenticated && terraProfile?.hasTerraAccount;
  return !isAuthenticated || !terraProfile ? null : isSetUpComplete ? null : (
    <RoundedPaper>
      <GridPaper>
        <Section>
          <SectionContent>
            <SectionTitle title="Complete your setup" />
            <Typography color="ink.light" variant={TEXT_BODY_400_2_LINES}>
              Follow these steps to unlock the full potential of the dataset
              browser.
            </Typography>
          </SectionContent>
        </Section>
        <CreateTerraAccount
          hasTerraAccount={Boolean(terraProfile?.hasTerraAccount)}
        />
      </GridPaper>
    </RoundedPaper>
  );
};
