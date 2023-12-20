import { SelectCategoryValueView } from "../../../common/entities";
import { escapeRegExp } from "../../../common/utils";
import {
  FilterMenuSearchMatch,
  FilterMenuSearchMatchRange,
  FilterMenuSearchMatchStringFn,
  FilterMenuSearchSortMatchesFn,
  FilterMenuSearchStringMatch,
} from "./entities";

function getRegExpMatchRanges(
  str: string,
  regExp: RegExp
): FilterMenuSearchMatchRange[] {
  return Array.from(str.matchAll(regExp), (match) => {
    const i = match.index as number; // type assertion to get around a TypeScript bug: https://github.com/microsoft/TypeScript/issues/36788
    return {
      end: i + match[0].length,
      start: i,
    };
  });
}

function getMatchStringFn(
  searchTerm: string,
  matchEmptySearchTerm = false
): FilterMenuSearchMatchStringFn | false {
  const wordRegExps = searchTerm
    .split(/\s+/)
    .filter((w) => w)
    .map((w) => new RegExp(escapeRegExp(w), "ig"));
  if (!wordRegExps.length)
    return matchEmptySearchTerm
      ? (): FilterMenuSearchStringMatch => ({ ranges: [], score: 1 })
      : false;
  const fullRegExp = new RegExp(escapeRegExp(searchTerm), "ig");
  return (str) => {
    let allMatch = true;
    const ranges: FilterMenuSearchMatchRange[] = [];
    for (const regExp of wordRegExps) {
      const wordRanges = getRegExpMatchRanges(str, regExp);
      if (!wordRanges.length) {
        allMatch = false;
        break;
      }
      ranges.push(...wordRanges);
    }
    const fullTermRanges = getRegExpMatchRanges(str, fullRegExp);
    ranges.push(...fullTermRanges);
    return allMatch ? { ranges, score: fullTermRanges.length ? 2 : 1 } : false;
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
