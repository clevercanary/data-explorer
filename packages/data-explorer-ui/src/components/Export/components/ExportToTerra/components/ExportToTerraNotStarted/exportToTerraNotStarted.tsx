import React, { ElementType } from "react";
import { FileManifestState } from "../../../../../../providers/fileManifestState";
import { PAPER_PANEL_STYLE } from "../../../../../common/Paper/paper";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import { Loading } from "../../../../../Loading/loading";
import { FormFacet, ManifestDownloadFormat } from "../../../../common/entities";
import { Section, SectionContent } from "../../../../export.styles";
import { OnRequestManifestFn } from "../../../ExportForm/exportForm";

export interface ExportToTerraNotStartedProps {
  ExportTerraForm: ElementType;
  ExportToTerraStart: ElementType;
  fileManifestState: FileManifestState;
  formFacet: FormFacet;
  isLoading: boolean;
  manifestDownloadFormats: ManifestDownloadFormat[];
  onRequestManifest: OnRequestManifestFn;
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
            onRequestManifest={onRequestManifest}
          />
        </Section>
      </FluidPaper>
    </div>
  );
};
