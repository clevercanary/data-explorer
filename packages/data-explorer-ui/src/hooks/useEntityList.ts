import { useEffect } from "react";
import {
  AzulEntitiesResponse,
  AzulEntitiesStaticResponse,
  AzulListParams,
} from "../apis/azul/common/entities";
import {
  transformAzulPagination,
  transformFilters,
  transformTermFacets,
} from "../apis/azul/common/filterTransformer";
import { ExploreActionKind } from "../providers/exploreState";
import { useAsync } from "./useAsync";
import { useAuthentication } from "./useAuthentication";
import { useEntityService } from "./useEntityService";
import { useExploreState } from "./useExploreState";
import { useURLFilterParams } from "./useURLFilterParams";

/**
 * Hook handling the load and transformation of the values used by index pages. If the current entity loaded statically,
 * this hook will return the already loaded data. Otherwise, it will make a request for the entity's pathUrl.
 * @param staticResponse - Statically loaded data, if any.
 * @returns Model of the entities list including pagination, sort, filter and loading indicator.
 */
export const useEntityList = (
  staticResponse: AzulEntitiesStaticResponse
): void => {
  // Load up the relevant contexts
  const { token } = useAuthentication();
  const { fetchEntitiesFromQuery, listStaticLoad, path } = useEntityService(); // Determine type of fetch to be executed, either API endpoint or TSV.
  const { exploreDispatch, exploreState } = useExploreState();
  const { data, isIdle, isLoading, run } = useAsync<AzulEntitiesResponse>(); // Init fetch of entities.
  const { filterState, sorting } = exploreState;
  const { termFacets } = data || {};
  const { updateFilterQueryString } = useURLFilterParams();

  /**
   * Update the filter query string when the filter state changes.
   */
  useEffect(() => {
    updateFilterQueryString(filterState);
  }, [filterState, updateFilterQueryString]);

  /**
   * Fetch Entities from the API when the filter state changes.
   * Server-side filtering
   */
  useEffect(() => {
    if (!listStaticLoad) {
      // Build basic list params
      const [sort] = sorting;
      const listParams: AzulListParams = sort
        ? { order: sort.desc ? "desc" : "asc", sort: sort.id }
        : {};

      // Build filter query params, if any
      const filtersParam = transformFilters(filterState);
      if (filtersParam) {
        listParams.filters = filtersParam;
      }

      if (
        exploreState.paginationState?.index?.type &&
        exploreState.paginationState.index.value
      ) {
        listParams[exploreState.paginationState.index.type] =
          exploreState.paginationState.index.value;
      }

      // Execute the fetch.
      run(fetchEntitiesFromQuery(path, listParams, token));
    }
  }, [
    exploreState.paginationState.index,
    fetchEntitiesFromQuery,
    filterState,
    path,
    run,
    sorting,
    listStaticLoad,
    token,
  ]);

  /**
   * Process Explore Response when data changes.
   * TODO filre this directly when the API respnse returns
   * Server-side filtering
   */
  useEffect(() => {
    if (!listStaticLoad && termFacets) {
      exploreDispatch({
        payload: {
          listItems: data?.hits,
          loading: isLoading || isIdle,
          paginationResponse: transformAzulPagination(data?.pagination),
          selectCategories: transformTermFacets(termFacets, filterState),
        },
        type: ExploreActionKind.ProcessExploreResponse,
      });
    }
  }, [
    data?.hits,
    data?.pagination,
    exploreDispatch,
    filterState,
    isIdle,
    isLoading,
    listStaticLoad,
    termFacets,
  ]);

  /**
   * Process Static Explore Response
   * For static loaded data (client side filtering) update the listItems with
   * the static response if it exists when the page loads
   **/
  useEffect(() => {
    if (
      listStaticLoad &&
      staticResponse &&
      staticResponse.data &&
      staticResponse.data.hits &&
      staticResponse.data.termFacets &&
      staticResponse.entityListType === exploreState.tabValue &&
      !exploreState.staticLoaded
    ) {
      const listItems = staticResponse?.data?.hits ?? [];
      exploreDispatch({
        payload: {
          listItems: listItems,
          loading: false,
          paginationResponse: {
            nextIndex: null,
            pageSize: listItems.length,
            pages: 1,
            previousIndex: null,
            rows: listItems.length,
          },
        },
        type: ExploreActionKind.ProcessExploreStaticResponse,
      });
    }
  }, [
    staticResponse?.data?.hits,
    staticResponse.entityListType,
    exploreState.tabValue,
    exploreState.staticLoaded,
    exploreDispatch,
    listStaticLoad,
    staticResponse,
  ]);
};
