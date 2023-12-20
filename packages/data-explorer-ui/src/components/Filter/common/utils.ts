import { SelectCategoryValueView } from "../../../common/entities";
import {
  FilterMenuSearchMatch,
  FilterMenuSearchMatchRange,
  FilterMenuSearchMatchStringFn,
  FilterMenuSearchSortMatchesFn,
  FilterMenuSearchStringMatch,
} from "./entities";

// TODO: find all occurrences, maybe pay attention to consecutive words (or just look for the whole search term)
function getMatchStringFn(
  searchTerm: string,
  matchEmptySearchTerm = false
): FilterMenuSearchMatchStringFn | false {
  const searchTermWords = searchTerm
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w);
  if (!searchTermWords.length)
    return matchEmptySearchTerm
      ? (): FilterMenuSearchStringMatch => ({ ranges: [], score: -1 })
      : false;
  return (str) => {
    str = str.toLowerCase();
    let allMatch = true;
    const ranges: FilterMenuSearchMatchRange[] = [];
    for (const word of searchTermWords) {
      const i = str.indexOf(word);
      if (i === -1) {
        allMatch = false;
        break;
      }
      ranges.push([i, i + word.length]);
    }
    return allMatch ? { ranges, score: 1 } : false;
  };
}

export function getSortMatchesFn(
  searchTerm: string,
  matchEmptySearchTerm?: boolean
): FilterMenuSearchSortMatchesFn | false {
  const matchString = getMatchStringFn(searchTerm, matchEmptySearchTerm);
  if (!matchString) return false;
  return (values: SelectCategoryValueView[]) => {
    const matches: FilterMenuSearchMatch[] = [];
    for (const value of values) {
      let match = matchString(value.label);
      if (match) {
        matches.push({ ...match, value });
      } else {
        match = matchString(value.key);
        if (match) matches.push({ score: match.score, value });
      }
    }
    return matches.sort(({ score: a }, { score: b }) => b - a);
  };
}
