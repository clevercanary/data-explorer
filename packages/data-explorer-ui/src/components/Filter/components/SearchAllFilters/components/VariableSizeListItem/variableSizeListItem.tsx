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
import { FilterMenuSearchMatchRange } from "../../../../common/entities";
import { FilterNoResultsFound } from "../../../FilterNoResultsFound/filterNoResultsFound";
import { ITEM_TYPE, SearchAllFiltersDynamicItem } from "../../common/entites";
import { MatchHighlight } from "../../searchAllFilters.styles";

interface Props {
  item: SearchAllFiltersDynamicItem;
  onFilter: OnFilterFn;
  onUpdateItemSizeByItemKey: (key: string, size: number) => void;
  searchTerm?: string;
  style: React.CSSProperties;
}

export default function VariableSizeListItem({
  item,
  onFilter,
  onUpdateItemSizeByItemKey,
  searchTerm,
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
      matchRanges,
      value: { count, key: valueKey, label, selected },
    } = item;
    return (
      <ListItemButton
        ref={setRef}
        key={key}
        onClick={(): void =>
          onFilter(categoryKey, valueKey, !selected, undefined, searchTerm)
        }
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
              {matchRanges?.length ? markSearchTerm(label, matchRanges) : label}
            </span>
          }
          secondary={
            <Typography color="ink.light" variant={TEXT_BODY_SMALL_400}>
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
  ranges: FilterMenuSearchMatchRange[]
): React.ReactNode {
  ranges = ranges.slice().sort(({ start: a }, { start: b }) => a - b);
  let prevIndex = 0;
  const items = [];
  for (let i = 0; i < ranges.length; i++) {
    const { start } = ranges[i];
    let { end } = ranges[i];
    while (i + 1 < ranges.length && ranges[i + 1].start <= end) {
      i++;
      end = Math.max(end, ranges[i].end);
    }
    const leftChar = label[start - 1];
    const rightChar = label[end];
    const leftOpen = !leftChar || /\s/.test(leftChar);
    const rightOpen = !rightChar || /\s/.test(rightChar);
    const matchItems = [
      label.substring(prevIndex, start),
      <MatchHighlight key={start} leftOpen={leftOpen} rightOpen={rightOpen}>
        {label.substring(start, end)}
      </MatchHighlight>,
    ];
    prevIndex = end;
    items.push(matchItems);
  }
  items.push(label.substring(prevIndex));
  return items;
}
