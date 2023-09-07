import React, { ElementType } from "react";
import { Filters } from "../../../../common/entities";
import { useExportToTerraResponseURL } from "../../../../hooks/useExportToTerraResponseURL";
import { FileManifestType } from "../../../../hooks/useFileManifest/common/entities";
import { useRequestFileManifest } from "../../../../hooks/useFileManifest/useRequestFileManifest";
import { useRequestFileLocation } from "../../../../hooks/useRequestFileLocation";
import { FileManifestState } from "../../../../providers/fileManifestState";
import { FormFacet, ManifestDownloadFormat } from "../../common/entities";
import { ExportToTerraNotStarted } from "./components/ExportToTerraNotStarted/exportToTerraNotStarted";
import { ExportToTerraReady } from "./components/ExportToTerraReady/exportToTerraReady";

export interface ExportToTerraProps {
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
  const { requestParams, requestURL } = fileManifestState;
  const { data, isLoading, run } = useRequestFileLocation(requestURL);
  const exportURL = useExportToTerraResponseURL(requestParams, data);
  return exportURL ? (
    <ExportToTerraReady
      ExportToTerraSuccess={ExportToTerraSuccess}
      exportURL={exportURL}
    />
  ) : (
    <ExportToTerraNotStarted
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
