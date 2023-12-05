import React, { ElementType } from "react";
import { Filters } from "../../../../common/entities";
import { useExportToTerraResponseURL } from "../../../../hooks/useExportToTerraResponseURL";
import { FileManifestType } from "../../../../hooks/useFileManifest/common/entities";
import { useFileManifest } from "../../../../hooks/useFileManifest/useFileManifest";
import { useRequestFileManifest } from "../../../../hooks/useFileManifest/useRequestFileManifest";
import { FileManifestState } from "../../../../providers/fileManifestState";
import { FormFacet, ManifestDownloadFormat } from "../../common/entities";
import { ExportToTerraNotStarted } from "./components/ExportToTerraNotStarted/exportToTerraNotStarted";
import { ExportToTerraReady } from "./components/ExportToTerraReady/exportToTerraReady";

export interface ExportToTerraProps {
  disabled?: boolean;
  ExportForm: ElementType;
  ExportToTerraStart: ElementType;
  ExportToTerraSuccess: ElementType;
  fileManifestState: FileManifestState;
  fileManifestType: FileManifestType;
  fileSummaryFacetName: string;
  filters: Filters; // Initializes export to terra filters.
  formFacet: FormFacet;
  manifestDownloadFormat: ManifestDownloadFormat;
  manifestDownloadFormats: ManifestDownloadFormat[];
}

export const ExportToTerra = ({
  disabled = false,
  ExportForm,
  ExportToTerraStart,
  ExportToTerraSuccess,
  fileManifestState,
  fileSummaryFacetName,
  filters,
  formFacet,
  manifestDownloadFormat,
  manifestDownloadFormats,
}: ExportToTerraProps): JSX.Element => {
  useRequestFileManifest(manifestDownloadFormat, filters, fileSummaryFacetName);
  const { requestParams } = fileManifestState;
  const { data, isLoading, run } = useFileManifest();
  const exportURL = useExportToTerraResponseURL(requestParams, data);
  return exportURL ? (
    <ExportToTerraReady
      ExportToTerraSuccess={ExportToTerraSuccess}
      exportURL={exportURL}
    />
  ) : (
    <ExportToTerraNotStarted
      disabled={disabled}
      ExportTerraForm={ExportForm}
      ExportToTerraStart={ExportToTerraStart}
      fileManifestState={fileManifestState}
      formFacet={formFacet}
      isLoading={isLoading}
      manifestDownloadFormats={manifestDownloadFormats}
      onRequestManifest={run}
    />
  );
};
