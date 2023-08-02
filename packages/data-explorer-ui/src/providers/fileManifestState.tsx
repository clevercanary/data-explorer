import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AzulSummaryResponse,
  ManifestDownloadFormat,
} from "../apis/azul/common/entities";
import { CategoryKey, CategoryValueKey, Filters } from "../common/entities";
import { useCatalog } from "../hooks/useCatalog";
import { buildNextFilterState } from "../hooks/useCategoryFilter";
import {
  FileFacet,
  FileManifestStateStatus,
  FILE_MANIFEST_STATE_STATUS,
} from "../hooks/useFileManifest/common/entities";
import { fetchManifestParams } from "../hooks/useFileManifest/common/fetchManifestParams";
import { useFetchFilesFacets } from "../hooks/useFileManifest/useFetchFilesFacets";
import { useFetchSummary } from "../hooks/useFileManifest/useFetchSummary";
import { useFileManifestRequestURL } from "../hooks/useFileManifest/useFileManifestRequestURL";

export type UpdateFileManifestFormatFn = (
  fileManifestFormat?: ManifestDownloadFormat
) => void;
export type UpdateFileManifestStateStatusFn = (
  status: FileManifestStateStatus
) => void;
export type UpdateFilterFn = (
  categoryKey: CategoryKey,
  selected: boolean,
  selectedValue: CategoryValueKey
) => void;
export type UpdateFiltersFn = (filters: Filters) => void;

export type FileManifestStateContextProps = {
  fileManifestFormat?: ManifestDownloadFormat;
  filesFacets: FileFacet[];
  filters: Filters;
  isLoading: boolean;
  requestParams?: URLSearchParams;
  requestURL?: string;
  summary?: AzulSummaryResponse;
  updateFileManifestFormat: UpdateFileManifestFormatFn;
  updateFileManifestStateStatus: UpdateFileManifestStateStatusFn;
  updateFilter: UpdateFilterFn;
  updateFilters: UpdateFiltersFn;
};

export interface FileManifestStateProps {
  children: ReactNode | ReactNode[];
}

export const FileManifestStateContext =
  createContext<FileManifestStateContextProps>({
    fileManifestFormat: undefined,
    filesFacets: [],
    filters: [],
    isLoading: false,
    requestParams: undefined,
    requestURL: undefined,
    summary: undefined,
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
    updateFileManifestFormat: (): void => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
    updateFileManifestStateStatus: (): void => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
    updateFilter: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
    updateFilters: () => {},
  });

export function FileManifestStateProvider({
  children,
}: FileManifestStateProps): JSX.Element {
  // File manifest state status.
  const isDisabledRef = useRef<boolean>(true);
  const { current: isDisabled } = isDisabledRef;

  // File manifest format state.
  const [fileManifestFormat, setFileManifestFormat] =
    useState<ManifestDownloadFormat>();

  // File manifest filters.
  const [filters, setFilters] = useState<Filters>([]);

  // Determine catalog.
  const [catalog] = useCatalog();

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

  // Build request params.
  const requestParams = useMemo(
    () => fetchManifestParams(filters, catalog, fileManifestFormat),
    [catalog, fileManifestFormat, filters]
  );

  // Build request URL.
  const requestURL = useFileManifestRequestURL(requestParams);

  // Updates file manifest format.
  const updateFileManifestFormat = useCallback(
    (fileManifestFormat: ManifestDownloadFormat | undefined): void => {
      isDisabledRef.current = false;
      setFileManifestFormat(fileManifestFormat);
    },
    []
  );

  // Updates file manifest state status.
  const updateFileManifestStateStatus = useCallback(
    (status: FileManifestStateStatus): void => {
      isDisabledRef.current = status === FILE_MANIFEST_STATE_STATUS.INACTIVE;
    },
    []
  );

  // Updates selected file manifest filters with given selected category value.
  const updateFilter = useCallback(
    (
      categoryKey: CategoryKey,
      selected: boolean,
      selectedValue: CategoryValueKey
    ): void => {
      setFilters((filters) =>
        buildNextFilterState(filters, categoryKey, selectedValue, selected)
      );
    },
    []
  );

  // Updates selected file manifest filters.
  const updateFilters = useCallback((filters: Filters): void => {
    setFilters(filters);
  }, []);

  return (
    <FileManifestStateContext.Provider
      value={{
        fileManifestFormat,
        filesFacets,
        filters,
        isLoading: isFacetsLoading || isSummaryLoading,
        requestParams,
        requestURL,
        summary,
        updateFileManifestFormat,
        updateFileManifestStateStatus,
        updateFilter, // Updates filters with given selected category value.
        updateFilters, // Updates filters with given filters.
      }}
    >
      {children}
    </FileManifestStateContext.Provider>
  );
}
