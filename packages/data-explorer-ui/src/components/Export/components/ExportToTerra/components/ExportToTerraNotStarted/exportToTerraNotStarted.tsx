import React, { ElementType } from "react";
import { ButtonPrimary } from "../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import { PAPER_PANEL_STYLE } from "../../../../../common/Paper/paper";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import { Loading } from "../../../../../Loading/loading";
import { FormFacet } from "../../../../common/entities";
import {
  Section,
  SectionActions,
  SectionContent,
} from "../../../../export.styles";

export interface ExportToTerraNotStartedProps {
  ExportTerraForm: ElementType;
  ExportToTerraStart: ElementType;
  formFacets: FormFacet[];
  isLoading: boolean;
  onRequestManifest: () => void;
}

export const ExportToTerraNotStarted = ({
  ExportTerraForm,
  ExportToTerraStart,
  formFacets,
  isLoading,
  onRequestManifest,
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
            <ExportToTerraStart />
          </SectionContent>
          <ExportTerraForm formFacets={formFacets} />
          <SectionActions>
            <ButtonPrimary onClick={onRequestManifest}>
              Request Link
            </ButtonPrimary>
          </SectionActions>
        </Section>
      </FluidPaper>
    </div>
  );
};
