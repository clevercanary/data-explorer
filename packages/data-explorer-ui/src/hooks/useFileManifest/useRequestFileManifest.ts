import { useEffect, useMemo } from "react";
import { ManifestDownloadFormat } from "../../apis/azul/common/entities";
import { Filters } from "../../common/entities";
import { useExploreState } from "../useExploreState";
import { useFileManifestState } from "../useFileManifestState";
import { FILE_MANIFEST_STATE_STATUS } from "./common/entities";

/**
 * Initializes and fetches file manifest comprising file facets and summary for the given file manifest format.
 * @param fileManifestFormat - File manifest format.
 * @param entity - Entity id key and value tuple, used to initialize filters for entity file manifest request.
 * @returns file manifest.
 */
export const useRequestFileManifest = (
  fileManifestFormat: ManifestDownloadFormat | undefined,
  entity: [string, string] | undefined
): void => {
  // Explore state.
  const { exploreState } = useExploreState();
  const { filterState } = exploreState;

  // File manifest state.
  const {
    updateFileManifestFormat,
    updateFileManifestStateStatus,
    updateFilters,
  } = useFileManifestState();

  // Initialize filters.
  const filters = useMemo(
    () => initFilters(entity, filterState),
    [entity, filterState]
  );

  // Reset file manifest state status to "INACTIVE" on unmount.
  useEffect(() => {
    return () => {
      updateFileManifestStateStatus(FILE_MANIFEST_STATE_STATUS.INACTIVE);
    };
  }, [updateFileManifestStateStatus]);

  // Initialize file manifest status ("active"/"inactive") and entity.
  useEffect(() => {
    updateFileManifestStateStatus(FILE_MANIFEST_STATE_STATUS.ACTIVE);
    updateFileManifestFormat(fileManifestFormat);
    updateFilters(filters);
  }, [
    fileManifestFormat,
    filters,
    updateFileManifestFormat,
    updateFileManifestStateStatus,
    updateFilters,
  ]);
};

/**
 * Returns selected export filters.
 * @param entity - Entity id key and value tuple, used by entity file manifest request.
 * @param filterState - Explore filter state.
 * @returns filters.
 */
function initFilters(
  entity: [string, string] | undefined,
  filterState: Filters
): Filters {
  if (!entity) {
    // File manifest request is not entity specific, and therefore the filters should be initialized with the
    // explore filter state.
    return filterState;
  }
  // File manifest request is for the given entity, and therefore the filters should only be initialized with the
  // given entity id.
  return [{ categoryKey: entity[0], value: [entity[1]] }];
}
