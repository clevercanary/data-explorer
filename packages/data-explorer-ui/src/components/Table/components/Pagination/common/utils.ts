import { AzulPaginationResponse } from "../../../../../apis/azul/common/entities";
import { SearchParams } from "../../../../../utils/fetchQueryParams";

export type PaginationParams = Pick<AzulPaginationResponse, "size">;

/**
 * Return the search request param values to be included in a request to the entity API.
 * @param paginationParams - Pagination params.
 * @returns search param values.
 */
export function buildFetchSearchResultsPaginationParams(
  paginationParams: PaginationParams
): SearchParams {
  return {
    size: paginationParams.size.toString(10),
  };
}
