import { escapeRegExp } from "../../../common/utils";
import {
  FilterMenuSearchMatch,
  FilterMenuSearchMatchRange,
  FilterMenuSearchMatchStringFn,
  FilterMenuSearchSortMatchesFn,
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
  searchTerm: string
): FilterMenuSearchMatchStringFn | null {
  if (!searchTerm) return null;
  const wordRegExps = searchTerm
    .split(/\s+/)
    .filter((w) => w)
    .map((w) => new RegExp(escapeRegExp(w), "ig"));
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
    return allMatch ? { ranges, score: fullTermRanges.length ? 2 : 1 } : null;
  };
}

export function getSortMatchesFn(
  searchTerm: string
): FilterMenuSearchSortMatchesFn {
  const matchString = getMatchStringFn(searchTerm);
  if (!matchString) {
    return (values) => values.map((value) => ({ score: 0, value }));
  }
  return (values) => {
    const matches: FilterMenuSearchMatch[] = [];
    for (const value of values) {
      let match = matchString(value.label || "");
      if (match) {
        matches.push({ ...match, value });
      } else {
        match = matchString(value.key || "");
        if (match) matches.push({ score: match.score, value });
      }
    }
    return matches.sort(({ score: a }, { score: b }) => b - a);
  };
}
