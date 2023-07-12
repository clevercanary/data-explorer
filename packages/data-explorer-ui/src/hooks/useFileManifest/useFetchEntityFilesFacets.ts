import { useEffect } from "react";
import {
  APIEndpoints,
  AzulEntitiesResponse,
} from "../../apis/azul/common/entities";
import { DEFAULT_TABLE_PARAMS } from "../../components/Table/components/Pagination/common/constants";
import { buildFetchSearchResultsPaginationParams } from "../../components/Table/components/Pagination/common/utils";
import { fetchEntitiesFromURL } from "../../entity/api/service";
import { fetchQueryParams } from "../../utils/fetchQueryParams";
import { useAsync } from "../useAsync";
import { useCatalog } from "../useCatalog";
import { useDetailState } from "../useDetailState";
import { useFetchRequestURL } from "../useFetchRequestURL";
import { FetchFilesFacets } from "./common/entities";
import { bindEntitySearchResultsResponse } from "./common/utils";

/**
 * Fetch entity files facets from files endpoint, to populate summary in entity download flows.
 * @returns files facets.
 */
export const useFetchEntityFilesFacets = (): FetchFilesFacets => {
  // Grab the selected filters, catalog and custom search params i.e. "size" and sorting behaviour.
  const { exportFilters } = useDetailState();
  const [, catalog] = useCatalog();
  const customParams =
    buildFetchSearchResultsPaginationParams(DEFAULT_TABLE_PARAMS);
  // Build request params.
  const requestParams = fetchQueryParams(exportFilters, catalog, customParams);
  // Build request URL.
  const requestURL = useFetchRequestURL(APIEndpoints.FILES, requestParams);
  const shouldFetchEntities = exportFilters.length > 0; // Should only fetch when entityId is specified.
  // Fetch and bind facets.
  const { data, isLoading, run } = useAsync<AzulEntitiesResponse>();
  const { facets } = bindEntitySearchResultsResponse(data, exportFilters);

  // Fetch facets from files endpoint.
  useEffect(() => {
    if (shouldFetchEntities) {
      run(fetchEntitiesFromURL(requestURL, undefined));
    }
  }, [requestURL, run, shouldFetchEntities]);

  return {
    filesFacets: facets,
    isLoading,
  };
};
