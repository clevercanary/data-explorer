import { useEffect, useState } from "react";
import { ManifestDownloadFormat } from "../../apis/azul/common/entities";
import { Filters } from "../../common/entities";
import { FileManifestActionKind } from "../../providers/fileManifestState";
import { useFileManifestState } from "../useFileManifestState";
import { FILE_MANIFEST_STATE_STATUS } from "./common/entities";

/**
 * Initializes and fetches file manifest comprising file facets and summary for the given file manifest format.
 * @param fileManifestFormat - File manifest format.
 * @param initialFilters - Filters to initialize file manifest request.
 * @param fileSummaryFacetName - File summary facet name.
 */
export const useRequestFileManifest = (
  fileManifestFormat: ManifestDownloadFormat | undefined,
  initialFilters: Filters | undefined = [],
  fileSummaryFacetName?: string
): void => {
  // Initial file manifest filter.
  const [initFilters] = useState(() => initialFilters);

  // File manifest state.
  const { fileManifestDispatch } = useFileManifestState();

  // Initialize file manifest format and filters, and file summary facet name.
  useEffect(() => {
    fileManifestDispatch({
      payload: fileSummaryFacetName,
      type: FileManifestActionKind.UpdateFileSummaryFacetName,
    });
    fileManifestDispatch({
      payload: fileManifestFormat,
      type: FileManifestActionKind.UpdateFileManifestFormat,
    });
    fileManifestDispatch({
      payload: initFilters,
      type: FileManifestActionKind.UpdateFilters,
    });
    fileManifestDispatch({
      payload: FILE_MANIFEST_STATE_STATUS.ACTIVE,
      type: FileManifestActionKind.UpdateStatus,
    });
    return () => {
      fileManifestDispatch({
        payload: FILE_MANIFEST_STATE_STATUS.INACTIVE,
        type: FileManifestActionKind.UpdateStatus,
      });
    };
  }, [
    fileManifestDispatch,
    fileManifestFormat,
    fileSummaryFacetName,
    initFilters,
  ]);
};
