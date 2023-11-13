/**
 * Handles Project's API requests
 */
// TODO move to Azul APIs section
import { AxiosRequestConfig } from "axios";
import {
  AzulEntitiesResponse,
  AzulListParams,
  AzulSummaryResponse,
  AZUL_PARAM,
} from "../../apis/azul/common/entities";
import { transformFilters } from "../../apis/azul/common/filterTransformer";
import { getConfig } from "../../config/config";
import { FilterState } from "../../hooks/useCategoryFilter";
import {
  getDefaultDetailParams,
  getDefaultListParams,
} from "../../shared/utils";
import { convertUrlParams } from "../../utils/url";
import { api } from "./client";

function createFetchOptions(
  accessToken: string | undefined
): AxiosRequestConfig {
  // TODO https://github.com/clevercanary/data-browser/issues/545
  return {
    headers: accessToken ? { Authorization: "Bearer " + accessToken } : {},
  };
}

/**
 * Make a GET or POST request for a list of entities
 * @param apiPath - Path that will be used to compose the API url
 * @param listParams - Params to be used on the request. If none passed, it will default to page's size 25 and the current catalog version
 * @param catalog - Catalog.
 * @param accessToken - string - auth token
 * @returns @see ListResponseType
 */
export const fetchEntitiesFromQuery = async (
  apiPath: string,
  listParams: AzulListParams,
  catalog: string | undefined,
  accessToken: string | undefined
): Promise<AzulEntitiesResponse> => {
  const catalogParam = catalog ? { [AZUL_PARAM.CATALOG]: catalog } : undefined;
  const params = { ...getDefaultListParams(), ...catalogParam, ...listParams };
  const response = await fetchEntitiesFromURL(
    `${apiPath}?${convertUrlParams(params)}`,
    accessToken
  );
  response.apiPath = apiPath;
  return response;
};

/**
 * Fetch entites list corresponding to the givenURL
 * @param path - path to request the list from
 * @param accessToken - auth token
 */
export const fetchEntitiesFromURL = async (
  path: string,
  accessToken: string | undefined
): Promise<AzulEntitiesResponse> => {
  const res = await api().get<AzulEntitiesResponse>(
    path,
    createFetchOptions(accessToken)
  );
  return res.data;
};

/**
 * Recursively call the endpoint to get a list of entities. This will iterate over the entity list until the next entity comes null
 * @param apiPath - Path that will be used to compose the API url
 * @returns @see ListResponseType
 */
export const fetchAllEntities = async (
  apiPath: string
): Promise<AzulEntitiesResponse> => {
  const listParams = {};
  const result = await fetchEntitiesFromQuery(
    apiPath,
    listParams,
    undefined,
    undefined
  );
  let hits = result.hits;
  let nextPage = result.pagination.next;
  while (nextPage) {
    const { data: nextPageJson } = await api().get<AzulEntitiesResponse>(
      nextPage
    );
    nextPage = nextPageJson.pagination.next;
    hits = [...hits, ...nextPageJson.hits];
  }
  return { ...result, hits } as AzulEntitiesResponse;
};

/**
 *  Request to get a single project.
 * @param id - entity's uuid.
 * @param apiPath - API endpoint URL.
 * @param catalog - Catalog.
 * @param accessToken - Access token.
 * @param param - Catalog's version, if none passed it will default to the current one.
 * @returns @see ProjectResponse
 */
export const fetchEntityDetail = async (
  id: string,
  apiPath: string,
  catalog: string | undefined,
  accessToken: string | undefined,
  param = getDefaultDetailParams()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this response type can't be determined beforehand
): Promise<any> => {
  const catalogParam = catalog ? { [AZUL_PARAM.CATALOG]: catalog } : undefined;
  const options = createFetchOptions(accessToken);
  const res = await api().get(
    `${apiPath}/${id}?${convertUrlParams({ ...param, ...catalogParam })}`,
    options
  );
  return res.data;
};

/**
 * Request to a single summary object that doesn't need id
 * @param filterState - Selected filters.
 * @param catalog - Catalog.
 * @param accessToken - Auth token.
 * @returns @see SummaryResponse
 */
export const fetchSummary = async (
  filterState: FilterState,
  catalog: string | undefined,
  accessToken: string | undefined
): Promise<AzulSummaryResponse> => {
  const { summaryConfig } = getConfig();

  if (!summaryConfig) {
    throw new Error("Summary not configured!");
  }

  const apiPath = summaryConfig.apiPath;

  // Build filter query params, if any
  let summaryParams;
  const filtersParam = transformFilters(filterState);
  const catalogParam = catalog ? { [AZUL_PARAM.CATALOG]: catalog } : undefined;
  if (filtersParam) {
    summaryParams = {
      ...catalogParam,
      [AZUL_PARAM.FILTERS]: filtersParam,
    };
  }

  const options = createFetchOptions(accessToken);
  const res = await api().get<AzulSummaryResponse>(
    `${apiPath}?${convertUrlParams({ ...summaryParams })}`,
    options
  );
  return res.data;
};

/**
 * Fetch summary from given URL.
 * @param path - URL.
 * @param accessToken - Auth token.
 */
export const fetchSummaryFromURL = async (
  path: string,
  accessToken: string | undefined
): Promise<AzulSummaryResponse> => {
  const res = await api().get<AzulSummaryResponse>(
    path,
    createFetchOptions(accessToken)
  );
  return res.data;
};
