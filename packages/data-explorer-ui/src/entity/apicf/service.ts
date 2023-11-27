import {
  AzulEntitiesResponse,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";
import { EntityMapper, GetIdFunction } from "../../config/entities";
import { PAGINATION_PAGE_SIZE } from "../../shared/constants";
import { api } from "./client";

const THROW_ERROR = "Not implemented.";

/**
 * Make a GET or POST request for a list of entities.
 */
export const fetchEntitiesFromQuery =
  async (): Promise<AzulEntitiesResponse> => {
    throw new Error(THROW_ERROR); // Not implemented.
  };

/**
 * Fetch entities from the given URL.
 * @param url - URL.
 */
export const fetchEntitiesFromURL = async (
  url: string
): Promise<AzulEntitiesResponse> => {
  const res = await api().get<AzulEntitiesResponse>(url);
  return res.data;
};

/**
 * Fetch all entities from the given API path.
 * @param apiPath - API endpoint URL.
 * @returns entities.
 */
export const fetchAllEntities = async (
  apiPath: string
): Promise<AzulEntitiesResponse> => {
  const response = await fetchEntitiesFromURL(apiPath);
  const entities = Object.values(response);
  return {
    apiPath,
    hits: entities,
    pagination: {
      count: 0,
      pages: Math.ceil(entities.length / PAGINATION_PAGE_SIZE),
      size: PAGINATION_PAGE_SIZE,
      total: entities.length,
    },
    termFacets: {},
  };
};

/**
 * Fetch entity from the given URL, entity ID and entity ID getter function.
 * @param id - Entity ID.
 * @param apiPath - API endpoint URL.
 * @param getId - Get identifier function.
 * @param entityMapper - Entity mapper.
 * @returns entity.
 */
export const fetchEntity = async <T, I>(
  id: string,
  apiPath: string,
  getId: GetIdFunction<T>,
  entityMapper?: EntityMapper<T, I>
): Promise<T> => {
  const response = await fetchAllEntities(apiPath);
  const entities = response.hits;
  const entity = entities.find((entity) => getId(entity) === id);
  return entityMapper?.(entity) || entity;
};

/**
 * Fetch entity detail.
 */
export const fetchEntityDetail = async (): Promise<any> => {
  throw new Error(THROW_ERROR); // Not implemented.
};

/**
 * Fetch summary data.
 */
export const fetchSummary = async (): Promise<AzulSummaryResponse> => {
  throw new Error(THROW_ERROR); // Not implemented.
};
