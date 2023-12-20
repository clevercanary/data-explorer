import { Dispatch, SetStateAction } from "react";
import { SelectCategoryValueView } from "../../../common/entities";

/**
 * Function invoked to update state for the search term.
 */
export type SetSearchTermFn = Dispatch<SetStateAction<string>>;

export type FilterMenuSearchMatchRange = [number, number];

export interface FilterMenuSearchStringMatch {
  ranges: FilterMenuSearchMatchRange[];
  score: number;
}

export type FilterMenuSearchMatchStringFn = (
  s: string
) => FilterMenuSearchStringMatch | false;

export interface FilterMenuSearchMatch {
  ranges?: FilterMenuSearchMatchRange[];
  score: number;
  value: SelectCategoryValueView;
}

export type FilterMenuSearchSortMatchesFn = (
  values: SelectCategoryValueView[]
) => FilterMenuSearchMatch[];
