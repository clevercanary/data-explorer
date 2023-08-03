import React, { ElementType } from "react";
import { MANIFEST_DOWNLOAD_FORMAT } from "../../../../apis/azul/common/entities";
import { useExportToTerraResponseURL } from "../../../../hooks/useExportToTerraResponseURL";
import { FileManifestType } from "../../../../hooks/useFileManifest/common/entities";
import { useRequestFileManifest } from "../../../../hooks/useFileManifest/useRequestFileManifest";
import { useFileManifestState } from "../../../../hooks/useFileManifestState";
import { useRequestFileLocation } from "../../../../hooks/useRequestFileLocation";
import { FormFacet } from "../../common/entities";
import { ExportToTerraNotStarted } from "./components/ExportToTerraNotStarted/exportToTerraNotStarted";
import { ExportToTerraReady } from "./components/ExportToTerraReady/exportToTerraReady";

export interface ExportToTerraProps {
  entity?: [string, string]; // [entityIdKey, entityId] (initializes entity export to terra filters).
  ExportForm: ElementType;
  ExportToTerraStart: ElementType;
  ExportToTerraSuccess: ElementType;
  fileManifestType: FileManifestType;
  formFacets: FormFacet[];
}

export const ExportToTerra = ({
  entity,
  ExportForm,
  ExportToTerraStart,
  ExportToTerraSuccess,
  formFacets,
}: ExportToTerraProps): JSX.Element => {
  useRequestFileManifest(MANIFEST_DOWNLOAD_FORMAT.TERRA_PFB, entity);
  const { requestParams, requestURL } = useFileManifestState();
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
      formFacets={formFacets}
      isLoading={isLoading}
      onRequestManifest={run}
    />
  );
};
