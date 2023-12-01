import {
  AzulEntitiesResponse,
  AzulEntityStaticResponse,
} from "../../apis/azul/common/entities";
import { getEntityURL } from "../../shared/utils";
import { api } from "./client";
import { getAxiosRequestOptions } from "./utils";

/**
 * Fetch entities from the given URL.
 * @param url - URL.
 * @param accessToken - Access token.
 * @returns entities.
 */
export const fetchEntitiesFromURL = async (
  url: string,
  accessToken?: string
): Promise<AzulEntitiesResponse> => {
  const res = await api().get<AzulEntitiesResponse>(
    url,
    getAxiosRequestOptions(accessToken)
  );
  return res.data;
};

/**
 * Fetch entity from the given URL.
 * @param url - URL.
 * @param accessToken - Access token.
 * @returns entity.
 */
export const fetchEntityFromURL = async (
  url: string,
  accessToken?: string
): Promise<AzulEntityStaticResponse> => {
  const baseURL = getEntityURL();
  const res = await api(baseURL).get<AzulEntityStaticResponse>(
    url,
    getAxiosRequestOptions(accessToken)
  );
  return res.data;
};
