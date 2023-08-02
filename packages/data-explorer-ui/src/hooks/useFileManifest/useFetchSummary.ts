import { useEffect } from "react";
import {
  APIEndpoints,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";
import { Filters } from "../../common/entities";
import { fetchSummaryFromURL } from "../../entity/api/service";
import { fetchQueryParams } from "../../utils/fetchQueryParams";
import { useAsync } from "../useAsync";
import { useFetchRequestURL } from "../useFetchRequestURL";
import { FetchFileSummary } from "./common/entities";

/**
 * Fetch file summary from summary endpoint, to populate summary in download flows.
 * @param filters - Selected filters.
 * @param catalog - Configured catalog.
 * @param isDisabled - Disable fetch.
 * @returns file summaries.
 */
export const useFetchSummary = (
  filters: Filters,
  catalog: string,
  isDisabled: boolean
): FetchFileSummary => {
  // Build request params.
  const requestParams = fetchQueryParams(filters, catalog, undefined);
  // Build request URL.
  const requestURL = useFetchRequestURL(APIEndpoints.SUMMARY, requestParams);
  // Fetch and bind summary.
  const { data, isLoading, run } = useAsync<AzulSummaryResponse>();

  // Fetch summary from summary endpoint.
  useEffect(() => {
    if (!isDisabled) {
      run(fetchSummaryFromURL(requestURL, undefined));
    }
  }, [isDisabled, requestURL, run]);

  return {
    isLoading,
    summary: data, // Binding of file summary is completed via configuration.
  };
};
