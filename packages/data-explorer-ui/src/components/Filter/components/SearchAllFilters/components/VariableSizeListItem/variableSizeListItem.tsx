import {
  Checkbox,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { OnFilterFn } from "../../../../../../hooks/useCategoryFilter";
import { TEXT_BODY_SMALL_400 } from "../../../../../../theme/common/typography";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { FilterNoResultsFound } from "../../../FilterNoResultsFound/filterNoResultsFound";
import { ITEM_TYPE, SearchAllFiltersDynamicItem } from "../../common/entites";
import { MatchHighlight } from "../../searchAllFilters.styles";

interface Props {
  item: SearchAllFiltersDynamicItem;
  onFilter: OnFilterFn;
  onUpdateItemSizeByItemKey: (key: string, size: number) => void;
  searchTermRegExp: RegExp | null;
  style: React.CSSProperties;
}

export default function VariableSizeListItem({
  item,
  onFilter,
  onUpdateItemSizeByItemKey,
  searchTermRegExp,
  style,
}: Props): JSX.Element {
  const { key } = item;
  const listItemRef = useRef<HTMLElement>();

  const setRef = (e: HTMLElement | null): void => {
    listItemRef.current = e || undefined;
  };

  // Sets map of list item key to its height.
  useEffect(() => {
    onUpdateItemSizeByItemKey(key, listItemRef.current?.clientHeight || 0);
  }, [key, onUpdateItemSizeByItemKey]);

  if (item.type === ITEM_TYPE.VALUE) {
    const {
      categoryKey,
      value: { count, key: valueKey, label, selected },
    } = item;
    return (
      <ListItemButton
        ref={setRef}
        key={key}
        onClick={(): void => onFilter(categoryKey, valueKey, !selected)}
        selected={selected}
        style={style}
      >
        <Checkbox
          checked={selected}
          checkedIcon={<CheckedIcon />}
          icon={<UncheckedIcon />}
        />
        <ListItemText
          disableTypography
          primary={
            <span>
              {searchTermRegExp
                ? markSearchTerm(label, searchTermRegExp)
                : label}
            </span>
          }
          secondary={
            <Typography color="inkLight" variant={TEXT_BODY_SMALL_400}>
              {count}
            </Typography>
          }
        />
      </ListItemButton>
    );
  } else if (item.type === ITEM_TYPE.CATEGORY) {
    return (
      <ListSubheader key={key} ref={setRef} style={style}>
        {item.categoryLabel}
      </ListSubheader>
    );
  } else {
    return <FilterNoResultsFound ref={setRef} />;
  }
}

function markSearchTerm(
  label: string,
  searchTermRegExp: RegExp
): React.ReactNode {
  let prevIndex = 0;
  return [
    Array.from(label.matchAll(searchTermRegExp), (match, itemIndex) => {
      const [matchText] = match;
      const matchIndex = match.index as number; // type assertion to get around a TypeScript bug: https://github.com/microsoft/TypeScript/issues/36788
      const endIndex = matchIndex + matchText.length;
      const leftChar = label[matchIndex - 1];
      const rightChar = label[endIndex];
      const leftOpen = !leftChar || /\s/.test(leftChar);
      const rightOpen = !rightChar || /\s/.test(rightChar);
      const items = [
        label.substring(prevIndex, matchIndex),
        <MatchHighlight
          key={itemIndex}
          leftOpen={leftOpen}
          rightOpen={rightOpen}
        >
          {matchText}
        </MatchHighlight>,
      ];
      prevIndex = endIndex;
      return items;
    }),
    label.substring(prevIndex),
  ];
}
