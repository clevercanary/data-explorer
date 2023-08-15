import { useRouter } from "next/router";
import { useEffect } from "react";
import { PARAMS_INDEX_UUID } from "../common/constants";
import { EntityDetailViewProps } from "../views/EntityDetailView/entityDetailView";
import { useAsync } from "./useAsync";
import { useAuthentication } from "./useAuthentication";
import { useEntityService } from "./useEntityService";

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
  const { data: entityList } = detailViewProps || {}; // Data is statically loaded if entity list is defined.
  const { token } = useAuthentication();
  const { fetchEntityDetail, listStaticLoad, path } = useEntityService();
  const {
    query: { params },
  } = useRouter();
  const uuid = params?.[PARAMS_INDEX_UUID] as string;
  const { data: response, isIdle, isLoading, run } = useAsync<T>();
  const isIdleOrLoading = isIdle || isLoading;
  const shouldFetchEntityDetail = !listStaticLoad && !response;

  useEffect(() => {
    // Fetch entity if entity data originates from a request, and has not yet been requested.
    if (shouldFetchEntityDetail && uuid) {
      run(fetchEntityDetail(uuid, path, token));
    }
  }, [fetchEntityDetail, path, run, shouldFetchEntityDetail, token, uuid]);

  if (token) {
    return {
      isLoading: entityList ? false : isIdleOrLoading,
      response: response ? response : entityList,
    };
  }

  return {
    isLoading: entityList ? false : isIdleOrLoading,
    response: entityList ? entityList : response,
  };
};
