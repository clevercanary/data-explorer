import React from "react";
import { MANIFEST_DOWNLOAD_FORMAT } from "../../../../../../apis/azul/common/entities";
import { Filters } from "../../../../../../common/entities";
import { FileManifestType } from "../../../../../../hooks/useFileManifest/common/entities";
import { useRequestFileManifest } from "../../../../../../hooks/useFileManifest/useRequestFileManifest";
import { FileManifestDownload } from "./components/FileManifestDownload/fileManifestDownload";
import { FileManifestSpreadsheet } from "./components/FileManifestSpreadsheet/fileManifestSpreadsheet";

export interface ManifestDownloadEntityProps {
  disabled?: boolean;
  fileManifestType: FileManifestType;
  filters: Filters; // Initializes manifest download filters.
  metadataFilters: Filters; // Metadata filters filters.
}

export const ManifestDownloadEntity = ({
  disabled = false,
  filters,
  metadataFilters,
}: ManifestDownloadEntityProps): JSX.Element => {
  useRequestFileManifest(MANIFEST_DOWNLOAD_FORMAT.COMPACT, filters, undefined);
  return (
    <>
      <FileManifestSpreadsheet disabled={disabled} filters={metadataFilters} />
      <FileManifestDownload disabled={disabled} filters={filters} />
    </>
  );
};
