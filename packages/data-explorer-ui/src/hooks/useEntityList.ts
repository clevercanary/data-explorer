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

/**
 *
 * Hook handling the load and transformation of the values used by index pages. If the current entity loaded statically,
 * this hook will return the already loaded data. Otherwise, it will make a request for the entity's pathUrl.
 * @param staticResponse - Statically loaded data, if any.
 * @returns Model of the entities list including pagination, sort, filter and loading indicator.
 */
export const useEntityList = (
  staticResponse: AzulEntitiesStaticResponse
): void => {
  // TODO: Update documentation
  // Load up the relevant contexts
  const { token } = useAuthentication();
  const { fetchEntitiesFromQuery, listStaticLoad, path } = useEntityService(); // Determine type of fetch to be executed, either API endpoint or TSV.
  const { exploreDispatch, exploreState } = useExploreState();
  const { data, isIdle, isLoading, run } = useAsync<AzulEntitiesResponse>(); // Init fetch of entities.
  const { filterState, sorting } = exploreState;
  const { termFacets } = data || {};

  console.log("Use Entity List!");
  /**
   * Hook for fetching entities matching the current query and authentication state.
   * Only runs if one of its deps changes. Skipped if staticLoaded entity
   */
  useEffect(() => {
    if (
      !listStaticLoad &&
      staticResponse.entityListType === exploreState.tabValue
    ) {
      console.log("Sorting! ", sorting);
      console.log(exploreState.sorting);
      // Build basic list params
      const [sort] = sorting;
      console.log("Query sorting!", sort);
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
    exploreState.tabValue,
    fetchEntitiesFromQuery,
    filterState,
    path,
    run,
    sorting,
    listStaticLoad,
    staticResponse,
    token,
  ]);

  // Builds categoryViews with an update of term facets.
  /**
   * Server filtering - ProcessExploreResponse
   */
  useEffect(() => {
    if (!listStaticLoad && termFacets) {
      console.log("It's me! - server filtering");
      console.log("Idle", isIdle);
      console.log("Loading", isLoading);
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
   * Client side filtering - ProcessExploreResponse
   */
  useEffect(() => {
    if (
      listStaticLoad &&
      staticResponse &&
      staticResponse.data &&
      staticResponse.data.hits &&
      staticResponse.data.termFacets &&
      staticResponse.entityListType === exploreState.tabValue
    ) {
      console.log("It's me! - client filtering");
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
          selectCategories: [],
        },
        type: ExploreActionKind.ProcessExploreResponse,
      });
    }
  }, [
    staticResponse?.data?.hits,
    staticResponse.entityListType,
    exploreState.tabValue,
    exploreDispatch,
    listStaticLoad,
    staticResponse,
  ]);
};
