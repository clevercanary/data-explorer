import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
} from "react";
import {
  AzulSummaryResponse,
  ManifestDownloadFormat,
} from "../apis/azul/common/entities";
import { getFilterParameterValue } from "../apis/azul/common/utils";
import {
  CategoryKey,
  CategoryValueKey,
  Filters,
  SelectedFilterValue,
} from "../common/entities";
import { useCatalog } from "../hooks/useCatalog";
import { buildNextFilterState } from "../hooks/useCategoryFilter";
import { buildFileManifestRequestURL } from "../hooks/useFileManifest/common/buildFileManifestRequestURL";
import {
  FileFacet,
  FileManifestStateStatus,
  FILE_MANIFEST_STATE_STATUS,
} from "../hooks/useFileManifest/common/entities";
import { useFetchFilesFacets } from "../hooks/useFileManifest/useFetchFilesFacets";
import { useFetchSummary } from "../hooks/useFileManifest/useFetchSummary";
import { useFileManifestURL } from "../hooks/useFileManifest/useFileManifestURL";

// Default file manifest state.
export const DEFAULT_FILE_MANIFEST_STATE = {
  fileManifestFormat: undefined,
  fileSummary: undefined,
  fileSummaryFacetName: undefined,
  fileSummaryFilters: [],
  filesFacets: [],
  filters: [],
  isFacetsLoading: false,
  isFileSummaryLoading: false,
  isLoading: false,
  isSummaryLoading: false,
  requestParams: undefined,
  requestURL: undefined,
  summary: undefined,
};

/**
 * File manifest state.
 */
export type FileManifestState = {
  fileManifestFormat?: ManifestDownloadFormat;
  filesFacets: FileFacet[];
  fileSummary?: AzulSummaryResponse;
  fileSummaryFacetName?: string;
  fileSummaryFilters: Filters;
  filters: Filters;
  isFacetsLoading: boolean;
  isFileSummaryLoading: boolean;
  isLoading: boolean;
  isSummaryLoading: boolean;
  requestParams?: URLSearchParams;
  requestURL?: string;
  summary?: AzulSummaryResponse;
};

/**
 * Model of file manifest state context.
 */
export type FileManifestStateContextProps = {
  fileManifestDispatch: Dispatch<FileManifestAction>;
  fileManifestState: FileManifestState;
};

export const FileManifestStateContext =
  createContext<FileManifestStateContextProps>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
    fileManifestDispatch: () => {},
    fileManifestState: DEFAULT_FILE_MANIFEST_STATE,
  });

export interface FileManifestStateProps {
  children: ReactNode | ReactNode[];
}

export function FileManifestStateProvider({
  children,
}: FileManifestStateProps): JSX.Element {
  // File manifest state status.
  const isDisabledRef = useRef<boolean>(true);
  const { current: isDisabled } = isDisabledRef;

  // Determine catalog.
  const [catalog] = useCatalog();

  // Determine file manifest request data URL.
  const URL = useFileManifestURL();

  // File manifest state.
  const [fileManifestState, fileManifestDispatch] = useReducer(
    (s: FileManifestState, a: FileManifestAction) =>
      fileManifestReducer(s, a, { URL, catalog, isDisabledRef }),
    DEFAULT_FILE_MANIFEST_STATE
  );

  const { fileSummaryFacetName, fileSummaryFilters, filters } =
    fileManifestState;

  // Fetch files facets.
  const { filesFacets, isLoading: isFacetsLoading } = useFetchFilesFacets(
    filters,
    catalog,
    { size: "25" },
    isDisabled
  );

  // Fetch summary.
  const { isLoading: isSummaryLoading, summary } = useFetchSummary(
    filters,
    catalog,
    isDisabled
  );

  // Fetch file summary.
  const { isLoading: isFileSummaryLoading, summary: fileSummary } =
    useFetchSummary(fileSummaryFilters, catalog, !fileSummaryFacetName);

  // Update file manifest state.
  useEffect(() => {
    fileManifestDispatch({
      payload: {
        fileSummary,
        filesFacets,
        isFacetsLoading,
        isFileSummaryLoading,
        isLoading: isFacetsLoading || isFileSummaryLoading || isSummaryLoading,
        isSummaryLoading,
        summary,
      },
      type: FileManifestActionKind.UpdateFileManifest,
    });
  }, [
    filesFacets,
    fileSummary,
    isFacetsLoading,
    isFileSummaryLoading,
    isSummaryLoading,
    summary,
  ]);

  return (
    <FileManifestStateContext.Provider
      value={{
        fileManifestDispatch,
        fileManifestState,
      }}
    >
      {children}
    </FileManifestStateContext.Provider>
  );
}

/**
 * File manifest action kind.
 */
export enum FileManifestActionKind {
  UpdateFileManifest = "UPDATE_FILE_MANIFEST",
  UpdateFileManifestFormat = "UPDATE_FILE_MANIFEST_FORMAT",
  UpdateFileSummaryFacetName = "UPDATE_FILE_SUMMARY_FACET_NAME",
  UpdateFilter = "UPDATE_FILTER",
  UpdateFilters = "UPDATE_FILTERS",
  UpdateFiltersCategory = "UPDATE_FILTERS_CATEGORY",
  UpdateStatus = "UPDATE_STATUS",
}

/**
 * File manifest action.
 */
export type FileManifestAction =
  | UpdateFileManifestAction
  | UpdateFileManifestFormatAction
  | UpdateFileSummaryFacetNameAction
  | UpdateFilterAction
  | UpdateFiltersAction
  | UpdateFiltersCategoryAction
  | UpdateStatusAction;

/**
 * Update file manifest action.
 */
type UpdateFileManifestAction = {
  payload: UpdateFileManifestPayload;
  type: FileManifestActionKind.UpdateFileManifest;
};

/**
 * Update file manifest format action.
 */
type UpdateFileManifestFormatAction = {
  payload: ManifestDownloadFormat | undefined;
  type: FileManifestActionKind.UpdateFileManifestFormat;
};

/**
 * Update file summary facet name action.
 */
type UpdateFileSummaryFacetNameAction = {
  payload: string | undefined;
  type: FileManifestActionKind.UpdateFileSummaryFacetName;
};

/**
 * Update filter action.
 */
type UpdateFilterAction = {
  payload: UpdateFilterPayload;
  type: FileManifestActionKind.UpdateFilter;
};

/**
 * Update filters action.
 */
type UpdateFiltersAction = {
  payload: Filters;
  type: FileManifestActionKind.UpdateFilters;
};

/**
 * Update filters by category action.
 */
type UpdateFiltersCategoryAction = {
  payload: CategoryKey;
  type: FileManifestActionKind.UpdateFiltersCategory;
};

/**
 * Update status action.
 */
type UpdateStatusAction = {
  payload: FileManifestStateStatus;
  type: FileManifestActionKind.UpdateStatus;
};

/**
 * Update file manifest payload.
 */
type UpdateFileManifestPayload = {
  filesFacets: FileFacet[];
  fileSummary?: AzulSummaryResponse;
  isFacetsLoading: boolean;
  isFileSummaryLoading: boolean;
  isLoading: boolean;
  isSummaryLoading: boolean;
  summary?: AzulSummaryResponse;
};

/**
 * Update filter payload.
 */
export type UpdateFilterPayload = {
  categoryKey: CategoryKey;
  selected: boolean;
  selectedValue: CategoryValueKey;
};

/**
 * File manifest context.
 */
export interface FileManifestContext {
  catalog: string;
  isDisabledRef: MutableRefObject<boolean>;
  URL: string;
}

/**
 * File manifest reducer.
 * @param state - File manifest state.
 * @param action - File manifest action.
 * @param fileManifestContext - File manifest context.
 * @returns file manifest state.
 */
function fileManifestReducer(
  state: FileManifestState,
  action: FileManifestAction,
  fileManifestContext: FileManifestContext
): FileManifestState {
  const { payload, type } = action;
  const { catalog, isDisabledRef, URL } = fileManifestContext;
  switch (type) {
    // Updates file manifest.
    case FileManifestActionKind.UpdateFileManifest: {
      return {
        ...state,
        ...payload,
      };
    }
    // Updates file manifest format.
    case FileManifestActionKind.UpdateFileManifestFormat: {
      return {
        ...state,
        fileManifestFormat: payload,
      };
    }
    // Updates file summary facet name.
    case FileManifestActionKind.UpdateFileSummaryFacetName: {
      return {
        ...state,
        fileSummaryFacetName: payload ? payload : state.fileSummaryFacetName,
      };
    }
    // Updates selected file manifest filters with given selected category value.
    case FileManifestActionKind.UpdateFilter: {
      // Build next filter state.
      const filters = buildNextFilterState(
        state.filters,
        payload.categoryKey,
        getFilterParameterValue(payload.selectedValue) as unknown as string, // TODO CategoryValueKey may be boolean or null.
        payload.selected
      );
      // Get file summary filters.
      const fileSummaryFilters = buildNextFileSummaryFilterState(
        filters,
        state.fileSummaryFacetName
      );
      // Build request params and request URL.
      const { requestParams, requestURL } =
        buildFileManifestRequestURL(
          URL,
          filters,
          catalog,
          state.fileManifestFormat
        ) || {};
      return {
        ...state,
        fileSummaryFilters,
        filters,
        requestParams,
        requestURL,
      };
    }
    // Updates selected file manifest filters.
    case FileManifestActionKind.UpdateFilters: {
      // Get file summary filters.
      const fileSummaryFilters = buildNextFileSummaryFilterState(
        payload,
        state.fileSummaryFacetName
      );
      // Build request params and request URL.
      const { requestParams, requestURL } =
        buildFileManifestRequestURL(
          URL,
          payload,
          catalog,
          state.fileManifestFormat
        ) || {};
      return {
        ...state,
        fileSummaryFilters,
        filters: payload,
        requestParams,
        requestURL,
      };
    }
    // Updates selected file manifest filters by category.
    case FileManifestActionKind.UpdateFiltersCategory: {
      // Build next filter state.
      const filters = updateCategoryFilterState(
        state.filters,
        payload,
        state.filesFacets
      );
      // Get file summary filters.
      const fileSummaryFilters = buildNextFileSummaryFilterState(
        filters,
        state.fileSummaryFacetName
      );
      // Build request params and request URL.
      const { requestParams, requestURL } =
        buildFileManifestRequestURL(
          URL,
          filters,
          catalog,
          state.fileManifestFormat
        ) || {};
      return {
        ...state,
        fileSummaryFilters,
        filters,
        requestParams,
        requestURL,
      };
    }
    // Updates file manifest status.
    case FileManifestActionKind.UpdateStatus: {
      isDisabledRef.current = payload === FILE_MANIFEST_STATE_STATUS.INACTIVE;
      return state;
    }
    default:
      return state;
  }
}

/**
 * Returns the file summary filters; comprising selected facets except any of the given facet name.
 * @param filters - Current set of selected category and category values.
 * @param facetName - Name of facet to exclude from file summary filters.
 * @returns file summary filters.
 */
function buildNextFileSummaryFilterState(
  filters: Filters,
  facetName?: string
): Filters {
  if (!facetName) {
    return [];
  }
  return filters.filter(({ categoryKey }) => categoryKey !== facetName);
}

/**
 * Returns all terms for the given category.
 * @param fileFacet - File facet.
 * @returns all terms for the given category.
 */
function getFileFacetTerms(fileFacet: FileFacet): SelectedFilterValue {
  return fileFacet.terms.map(
    (term) => getFilterParameterValue(term.name) as unknown as string // TODO CategoryValueKey may be boolean or null.
  );
}

/**
 * Build new set of selected filters on de/select of filter category.
 * @param filters - Current set of selected category and category values.
 * @param categoryKey - Key of category that has been de/selected.
 * @param filesFacets - File facets.
 * @returns New filter state generated from the current set of selected values and the newly selected category.
 */
function updateCategoryFilterState(
  filters: Filters,
  categoryKey: CategoryKey,
  filesFacets: FileFacet[]
): Filters {
  // Find the selected category facet.
  const categoryFacet = filesFacets.find(({ name }) => name === categoryKey);

  if (!categoryFacet) {
    return filters;
  }

  const { selectedTermCount, termCount } = categoryFacet;

  // Create a copy of the current filter state. Remove the selected filter for the selected category, if any.
  const nextFilterState = filters.filter(
    ({ categoryKey: key }) => key !== categoryKey
  );

  // If the selected category already has all selected values, return the next filter state with removed selected category.
  if (selectedTermCount === termCount) {
    return nextFilterState;
  }

  // Create new selected filter for this category.
  const nextCategorySelectedFilter = {
    categoryKey,
    value: getFileFacetTerms(categoryFacet),
  };

  nextFilterState.push(nextCategorySelectedFilter);

  return nextFilterState;
}
