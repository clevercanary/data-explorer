import { Dispatch, SetStateAction } from "react";
import { SelectCategoryValueView } from "../../../common/entities";

/**
 * Function invoked to update state for the search term.
 */
export type SetSearchTermFn = Dispatch<SetStateAction<string>>;

export interface FilterMenuSearchMatchRange {
  end: number;
  start: number;
}

export interface FilterMenuSearchStringMatch {
  ranges: FilterMenuSearchMatchRange[];
  score: number;
}

export type FilterMenuSearchMatchStringFn = (
  s: string
) => FilterMenuSearchStringMatch | null;

export interface FilterMenuSearchMatch {
  ranges?: FilterMenuSearchMatchRange[];
  score: number;
  value: SelectCategoryValueView;
}

export type FilterMenuSearchSortMatchesFn = (
  values: SelectCategoryValueView[]
) => FilterMenuSearchMatch[];
