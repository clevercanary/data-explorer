import { Filters } from "../../common/entities";
import { SearchParams } from "../../utils/fetchQueryParams";
import { FileFacet, FileSummary } from "./common/entities";
import { useFetchFilesFacets } from "./useFetchFilesFacets";
import { useFetchSummary } from "./useFetchSummary";

export enum FileManifestAction {
  FETCH_ENTITY_FILE_MANIFEST = "FETCH_ENTITY_FILE_MANIFEST",
}

export interface FileManifest {
  filesFacets: FileFacet[];
  fileSummary: FileSummary;
  isLoading: boolean;
}

/**
 * Returns file manifest comprising file facets and summary for the given filters and configured catalog and any
 * additional search parameters such as "size" and sorting behaviour.
 * @param action - File manifest action.
 * @param filters - Selected filters.
 * @param catalog - Configured catalog.
 * @param searchParams - Custom search parameters i.e. "size" and sorting behaviour.
 * @returns file manifest.
 */
export const useFileManifest = (
  action: FileManifestAction,
  filters: Filters,
  catalog: string,
  searchParams?: SearchParams
): FileManifest => {
  const isDisabled = FileManifestAction.FETCH_ENTITY_FILE_MANIFEST
    ? filters.length === 0
    : false; // Disable the entity file manifest when entityId is undefined (typically on first render).
  // Fetch files facets.
  const { filesFacets, isLoading: isFacetsLoading } = useFetchFilesFacets(
    filters,
    catalog,
    searchParams,
    isDisabled
  );
  // Fetch file summary.
  const { fileSummary, isLoading: isSummaryLoading } = useFetchSummary(
    filters,
    catalog,
    isDisabled
  );

  return {
    fileSummary,
    filesFacets,
    isLoading: isFacetsLoading || isSummaryLoading,
  };
};
