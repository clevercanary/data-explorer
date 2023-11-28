import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { RESPONSE_SOURCE } from "../apis/azul/common/entities";
import { PARAMS_INDEX_UUID } from "../common/constants";
import { EntityDetailViewProps } from "../views/EntityDetailView/entityDetailView";
import { useAsync } from "./useAsync";
import { useAuthentication } from "./useAuthentication";
import { useConfig } from "./useConfig";
import { useEntityService } from "./useEntityService";
import { EXPLORE_MODE, useExploreMode } from "./useExploreMode";
import { useExploreState } from "./useExploreState";

interface UseEntityDetailResponse<T> {
  isLoading: boolean;
  response?: T;
}

/**
 * Hook handling the load and transformation of the values used by detail pages. If the current entity loaded statically,
 * this hook will return the already loaded data. Otherwise, it will make a request for the entity's pathUrl
 * @param detailViewProps - Statically loaded data, if any.
 * @returns Object with the loaded data and a flag indicating is the data is loading.
 */
export const useFetchEntity = <T,>(
  detailViewProps?: EntityDetailViewProps
): UseEntityDetailResponse<T> => {
  const { data: entityList, entityListType } = detailViewProps || {}; // Data is statically loaded if entity list is defined.
  const { authentication } = useConfig().config;
  const { token } = useAuthentication();
  const exploreMode = useExploreMode();
  const {
    exploreState: { catalogState },
  } = useExploreState();
  const { catalog, fetchEntityDetail, path } = useEntityService(entityListType);
  const {
    query: { params },
  } = useRouter();
  const uuid = params?.[PARAMS_INDEX_UUID] as string;
  const { data: response, isIdle, isLoading, run } = useAsync<T>();
  const isIdleOrLoading = isIdle || isLoading;
  const shouldFetchEntity = useMemo(
    () =>
      isFetchRequired(
        exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING,
        Boolean(authentication && token),
        Boolean(entityList),
        Boolean(response),
        Boolean(catalogState)
      ),
    [authentication, catalogState, entityList, exploreMode, response, token]
  );

  useEffect(() => {
    // Fetch entity if entity data originates from a request, and has not yet been requested.
    if (shouldFetchEntity && uuid) {
      run(fetchEntityDetail(uuid, path, catalog, token));
    }
  }, [catalog, fetchEntityDetail, path, run, shouldFetchEntity, token, uuid]);

  if (token) {
    return {
      isLoading: entityList ? false : isIdleOrLoading,
      response: response
        ? {
            ...response,
            responseSource: RESPONSE_SOURCE.FETCH,
          }
        : { ...entityList, responseSource: RESPONSE_SOURCE.STATIC_GENERATION },
    };
  }

  return {
    isLoading: entityList ? false : isIdleOrLoading,
    response: entityList ? entityList : response,
  };
};

/**
 * Returns true if fetching the entity is necessary.
 * TODO see Fix fetch of entity if entity is statically generated and catalog is user defined #476.
 * @param listStaticLoad - Flag indicating if the entity list is statically loaded.
 * @param isAuthenticated - Flag indicating if authentication is enabled.
 * @param hasStaticResponse - Flag indicating if a statically loaded response exists.
 * @param hasFetchResponse - Flag indicating if a response exists.
 * @param isCatalogState - Flag indicating if the catalog state is defined.
 * @returns true if a fetch is necessary.
 */
function isFetchRequired(
  listStaticLoad: boolean,
  isAuthenticated: boolean,
  hasStaticResponse: boolean,
  hasFetchResponse: boolean,
  isCatalogState: boolean
): boolean {
  if (listStaticLoad) {
    return false;
  }
  if (hasStaticResponse) {
    if (isAuthenticated || isCatalogState) {
      return !hasFetchResponse;
    }
    return false;
  }
  return !hasFetchResponse;
}
