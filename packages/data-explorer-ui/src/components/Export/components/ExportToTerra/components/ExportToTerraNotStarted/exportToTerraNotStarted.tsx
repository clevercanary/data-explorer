import React, { ElementType, useState } from "react";
import { FileManifestState } from "../../../../../../providers/fileManifestState";
import { PAPER_PANEL_STYLE } from "../../../../../common/Paper/paper";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import { Loading } from "../../../../../Loading/loading";
import { FormFacet, ManifestDownloadFormat } from "../../../../common/entities";
import {
  Section,
  SectionActions,
  SectionContent,
} from "../../../../export.styles";
import { ExportButton } from "../../../ExportForm/components/ExportButton/exportButton";

export interface ExportToTerraNotStartedProps {
  ExportTerraForm: ElementType;
  ExportToTerraStart: ElementType;
  fileManifestState: FileManifestState;
  formFacet: FormFacet;
  isLoading: boolean;
  manifestDownloadFormats: ManifestDownloadFormat[];
  onRequestManifest: () => void;
}

export const ExportToTerraNotStarted = ({
  ExportTerraForm,
  ExportToTerraStart,
  fileManifestState,
  formFacet,
  isLoading,
  manifestDownloadFormats,
  onRequestManifest,
}: ExportToTerraNotStartedProps): JSX.Element => {
  const [isRequestFormValid, setIsRequestFormValid] = useState<boolean>(false);
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
          <ExportTerraForm
            formFacet={formFacet}
            isLoading={fileManifestState.isLoading}
            manifestDownloadFormat={fileManifestState.fileManifestFormat}
            manifestDownloadFormats={manifestDownloadFormats}
            setIsRequestFormValid={setIsRequestFormValid}
          />
          <SectionActions>
            <ExportButton
              disabled={fileManifestState.isLoading || !isRequestFormValid}
              isLoading={fileManifestState.isLoading}
              onClick={onRequestManifest}
            >
              Request Link
            </ExportButton>
          </SectionActions>
        </Section>
      </FluidPaper>
    </div>
  );
};
