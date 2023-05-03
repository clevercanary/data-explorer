import { SelectedFilter } from "common/entities";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useLocation } from "./useLocation";

interface UseURLFilterParamsResult {
  decodedFilterParam: string;
  updateFilter: (filterState: SelectedFilter[]) => void;
}

/**
 * useURLFilterParams hook is used to keep track of the url search params, and update them,
 * if needed
 * @returns an object containing a update function and the current filter
 */
export const useURLFilterParams = (): UseURLFilterParamsResult => {
  const { basePath, push } = useRouter();
  const location = useLocation();
  const filterParam = location?.search?.filter ?? "[]";
  const decodedFilterParam = decodeURIComponent(filterParam);

  const updateFilter = useCallback(
    (filterState: SelectedFilter[]) => {
      const filter =
        filterState.length > 0 ? { filter: JSON.stringify(filterState) } : {};
      push(
        {
          pathname: location?.pathname.replace(basePath, ""),
          query: { ...filter },
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- push method isn't memoized and shouldn't be added as deps https://github.com/vercel/next.js/issues/18127
    [location?.href]
  );

  return {
    decodedFilterParam,
    updateFilter,
  };
};
