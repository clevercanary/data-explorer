import {
  AZUL_PARAM,
  ManifestDownloadFormat,
} from "../../../apis/azul/common/entities";
import { transformFilters } from "../../../apis/azul/common/filterTransformer";
import { Filters } from "../../../common/entities";

/**
 * Build up file manifest request URL query string for the given search results, catalog and format.
 * @param filters - Selected filters.
 * @param catalog - Configured catalog.
 * @param manifestFormat - Manifest format.
 * @returns file manifest request URL query string.
 */
export const fetchManifestParams = (
  filters: Filters,
  catalog: string,
  manifestFormat: ManifestDownloadFormat | undefined
): URLSearchParams | undefined => {
  if (!manifestFormat) {
    return;
  }
  // Build request params.
  return new URLSearchParams({
    [AZUL_PARAM.CATALOG]: catalog,
    [AZUL_PARAM.FILTERS]: transformFilters(filters),
    format: manifestFormat,
  });
};
