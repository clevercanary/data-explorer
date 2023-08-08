import React, { ElementType } from "react";
import { ButtonPrimary } from "../../../../../common/Button/button.styles";
import { Code } from "../../../../../common/Code/code";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import { ANCHOR_TARGET } from "../../../../../Links/common/entities";
import {
  Section,
  SectionActions,
  SectionContent,
} from "../../../../export.styles";

export interface ExportToTerraReadyProps {
  ExportToTerraSuccess: ElementType;
  exportURL: string;
}

export const ExportToTerraReady = ({
  ExportToTerraSuccess,
  exportURL,
}: ExportToTerraReadyProps): JSX.Element => {
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          <ExportToTerraSuccess />
          <Code code={exportURL} />
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
