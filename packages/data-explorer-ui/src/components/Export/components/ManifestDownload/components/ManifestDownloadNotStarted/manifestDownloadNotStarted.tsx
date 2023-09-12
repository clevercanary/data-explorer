import React, { ElementType, useState } from "react";
import { FileManifestState } from "../../../../../../providers/fileManifestState";
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

export interface ManifestDownloadNotStartedProps {
  fileManifestState: FileManifestState;
  formFacet: FormFacet;
  isLoading: boolean;
  ManifestDownloadForm: ElementType;
  ManifestDownloadStart: ElementType;
  onRequestManifest: () => void;
}

export const ManifestDownloadNotStarted = ({
  fileManifestState,
  formFacet,
  isLoading,
  ManifestDownloadForm,
  ManifestDownloadStart,
  onRequestManifest,
}: ManifestDownloadNotStartedProps): JSX.Element => {
  const [isRequestFormValid, setIsRequestFormValid] = useState<boolean>(false);
  return (
    <div>
      <Loading
        loading={isLoading}
        panelStyle={PAPER_PANEL_STYLE.FLUID}
        text="Your manifest will be ready shortly..."
      />
      <FluidPaper>
        <Section>
          <SectionContent>
            <ManifestDownloadStart />
          </SectionContent>
          <ManifestDownloadForm
            formFacet={formFacet}
            isLoading={fileManifestState.isLoading}
            setIsRequestFormValid={setIsRequestFormValid}
          />
          <SectionActions>
            <ButtonPrimary
              disabled={fileManifestState.isLoading || !isRequestFormValid}
              onClick={onRequestManifest}
            >
              Prepare Manifest
            </ButtonPrimary>
          </SectionActions>
        </Section>
      </FluidPaper>
    </div>
  );
};
