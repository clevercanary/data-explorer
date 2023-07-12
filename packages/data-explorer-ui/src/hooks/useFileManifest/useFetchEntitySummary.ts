import { useEffect } from "react";
import {
  APIEndpoints,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";
import { fetchSummaryFromURL } from "../../entity/api/service";
import { fetchQueryParams } from "../../utils/fetchQueryParams";
import { useAsync } from "../useAsync";
import { useCatalog } from "../useCatalog";
import { useDetailState } from "../useDetailState";
import { useFetchRequestURL } from "../useFetchRequestURL";
import { FetchFileSummary } from "./common/entities";
import { bindFileSummaryResponse } from "./common/utils";

/**
 * Fetch entity file summary from summary endpoint, to populate summary in entity download flows.
 * @returns file summaries.
 */
export const useFetchEntitySummary = (): FetchFileSummary => {
  // Grab the selected filters and catalog.
  const { exportFilters } = useDetailState();
  const [, catalog] = useCatalog();
  // Build request params.
  const requestParams = fetchQueryParams(exportFilters, catalog);
  // Build request URL.
  const requestURL = useFetchRequestURL(APIEndpoints.SUMMARY, requestParams);
  const shouldFetchSummary = exportFilters.length > 0; // Should only fetch when entityId is specified.
  // Fetch and bind summary.
  const { data, isLoading, run } = useAsync<AzulSummaryResponse>();
  const fileSummary = bindFileSummaryResponse(data);

  // Fetch summary from summary endpoint.
  useEffect(() => {
    if (shouldFetchSummary) {
      run(fetchSummaryFromURL(requestURL, undefined));
    }
  }, [requestURL, run, shouldFetchSummary]);

  return {
    fileSummary,
    isLoading,
  };
};
