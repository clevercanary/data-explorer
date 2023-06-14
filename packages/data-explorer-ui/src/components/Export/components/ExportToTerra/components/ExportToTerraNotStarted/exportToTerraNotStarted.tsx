import React, { ElementType } from "react";
import { ButtonPrimary } from "../../../../../common/Button/button.styles";
import { PAPER_PANEL_STYLE } from "../../../../../common/Paper/paper";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import { Loading } from "../../../../../Loading/loading";
import {
  Section,
  SectionActions,
  SectionContent,
} from "../../../../export.styles";

export type ExportToTerraRunFn = () => void;

export interface ExportToTerraNotStartedProps {
  ExportForm: ElementType;
  ExportToTerra: ElementType;
  isLoading: boolean;
  run: ExportToTerraRunFn;
}

export const ExportToTerraNotStarted = ({
  ExportForm,
  ExportToTerra,
  isLoading,
  run,
}: ExportToTerraNotStartedProps): JSX.Element => {
  return (
    <div>
      <Loading
        loading={isLoading}
        panelStyle={PAPER_PANEL_STYLE.FLUID}
        text="Your link will be ready shortly..."
      />
      <FluidPaper>
        <Section>
          <SectionContent>
            <ExportToTerra />
          </SectionContent>
          <ExportForm />
          <SectionActions>
            <ButtonPrimary onClick={run}>Request Link</ButtonPrimary>
          </SectionActions>
        </Section>
      </FluidPaper>
    </div>
  );
};
