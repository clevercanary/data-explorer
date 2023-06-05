import React from "react";
import { ButtonPrimary } from "../../../common/Button/button.styles";
import { FluidPaper } from "../../../common/Paper/paper.styles";
import { SectionTitle } from "../../../common/Section/components/SectionTitle/sectionTitle";
import {
  Section,
  SectionActions,
  SectionContent,
  SectionText,
} from "../../../common/Section/section.styles";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import { BatchNormalizationWarning } from "../BatchNormalizationWarning/batchNormalizationWarning";
import { ExportToTerraReadyProps } from "../ExportToTerra/components/ExportToTerraReady/exportToTerraReady";

export const ExportToTerraReady = ({
  exportURL,
}: Pick<ExportToTerraReadyProps, "exportURL">): JSX.Element => {
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          <SectionTitle title="Your Terra Workspace Link is Ready" />
          <SectionText component="div" variant="text-body-400-2lines">
            <p>
              Your Terra Workspace has been opened in a new browser tab. The
              workspace URL is referenced below.
            </p>
            <BatchNormalizationWarning />
          </SectionText>
        </SectionContent>
        <SectionActions>
          <ButtonPrimary
            href={exportURL}
            rel="noopener"
            target={ANCHOR_TARGET.BLANK}
          >
            Open Terra
          </ButtonPrimary>
        </SectionActions>
      </Section>
    </FluidPaper>
  );
};
