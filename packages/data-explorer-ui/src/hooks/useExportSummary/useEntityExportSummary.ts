import { DEFAULT_TABLE_PARAMS } from "../../components/Table/components/Pagination/common/constants";
import { buildFetchSearchResultsPaginationParams } from "../../components/Table/components/Pagination/common/utils";
import { useCatalog } from "../useCatalog";
import { useDetailState } from "../useDetailState";
import {
  FetchFileManifest,
  FileManifestAction,
  useFileManifest,
} from "../useFileManifest/useFileManifest";

/**
 * Returns entity file manifest i.e. file facets and summary.
 * @returns entity file manifest.
 */
export const useEntityExportSummary = (): FetchFileManifest => {
  // Grab the selected filters, catalog and custom search params i.e. "size" and sorting behaviour.
  const { exportFilters } = useDetailState();
  const [, catalog] = useCatalog();
  const searchParams =
    buildFetchSearchResultsPaginationParams(DEFAULT_TABLE_PARAMS);
  // Fetch and return files facets and summary.
  return useFileManifest(
    FileManifestAction.FETCH_ENTITY_FILE_MANIFEST,
    exportFilters,
    catalog,
    searchParams
  );
};
