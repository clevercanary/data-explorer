import { useEffect, useMemo } from "react";
import {
  APIEndpoints,
  AzulEntitiesResponse,
} from "../../apis/azul/common/entities";
import { Filters } from "../../common/entities";
import { fetchEntitiesFromURL } from "../../entity/api/service";
import { fetchQueryParams, SearchParams } from "../../utils/fetchQueryParams";
import { useAsync } from "../useAsync";
import { useAuthentication } from "../useAuthentication";
import { useFetchRequestURL } from "../useFetchRequestURL";
import { FetchFilesFacets } from "./common/entities";
import { bindEntitySearchResultsResponse } from "./common/utils";

/**
 * Fetch files facets from files endpoint, to populate summary in download flows.
 * @param filters - Selected filters.
 * @param catalog - Configured catalog.
 * @param searchParams - Custom search parameters i.e. "size" and sorting behaviour.
 * @param isDisabled - Disable fetch.
 * @returns files facets.
 */
export const useFetchFilesFacets = (
  filters: Filters,
  catalog: string,
  searchParams: SearchParams | undefined,
  isDisabled: boolean
): FetchFilesFacets => {
  // Grab token from authentication.
  const { token } = useAuthentication();
  // Build request params.
  const requestParams = fetchQueryParams(filters, catalog, searchParams);
  // Build request URL.
  const requestURL = useFetchRequestURL(APIEndpoints.FILES, requestParams);
  // Fetch and bind facets.
  const { data, isLoading, run } = useAsync<AzulEntitiesResponse>();
  // Bind facets.
  const { facets } = useMemo(
    () => bindEntitySearchResultsResponse(data, filters),
    [data, filters]
  );

  // Fetch facets from files endpoint.
  useEffect(() => {
    if (!isDisabled) {
      run(fetchEntitiesFromURL(requestURL, token));
    }
  }, [isDisabled, requestURL, run, token]);

  return {
    filesFacets: facets,
    isLoading,
  };
};
