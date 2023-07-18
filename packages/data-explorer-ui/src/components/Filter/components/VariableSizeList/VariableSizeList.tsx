import { List as MList } from "@mui/material";
import React, { useCallback, useRef } from "react";
import {
  ListChildComponentProps,
  VariableSizeList as List,
  VariableSizeListProps as ListProps,
} from "react-window";
import {
  CategoryKey,
  SelectCategoryValueView,
} from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import {
  LIST_ITEM_HEIGHT,
  MAX_DISPLAYABLE_LIST_ITEMS,
  MAX_LIST_HEIGHT_PX,
} from "../../common/constants";
import VariableSizeListItem from "../VariableSizeListItem/variableSizeListItem";

export type ItemSizeByItemKey = Map<string, number>;

export interface VariableSizeListProps {
  categoryKey: CategoryKey;
  height?: ListProps["height"]; // Height of list.
  itemSize?: number; // Default item size.
  onFilter: OnFilterFn;
  overscanCount?: ListProps["overscanCount"];
  values: SelectCategoryValueView[];
  width?: ListProps["width"]; // Width of list; default to 100% width of parent element.
}

/**
 * Build variable list item element.
 * @param props - Variable size list child component props i.e. list index, style.
 * @returns variable list item element.
 */
function renderListItem(props: ListChildComponentProps): JSX.Element {
  const { data, index, style } = props;
  const { categoryKey, onFilter, setItemSizeByItemKey, values } = data;
  return (
    <VariableSizeListItem
      categoryKey={categoryKey}
      listItem={values[index]}
      onFilter={onFilter}
      setItemSizeByItemKey={setItemSizeByItemKey}
      style={style}
    />
  );
}

export const VariableSizeList = ({
  categoryKey,
  height = MAX_LIST_HEIGHT_PX,
  itemSize = LIST_ITEM_HEIGHT,
  onFilter,
  overscanCount = MAX_DISPLAYABLE_LIST_ITEMS * 2,
  values,
  width = "100%",
}: VariableSizeListProps): JSX.Element => {
  const itemSizeByItemKeyRef = useRef<ItemSizeByItemKey>(new Map());
  const listRef = useRef<List>(null);
  const { current: itemSizeByItemKey } = itemSizeByItemKeyRef;

  // Sets item size by item key map.
  const setItemSizeByItemKey = useCallback(
    (itemKey: string, itemSize: number) => {
      listRef.current?.resetAfterIndex(0);
      if (itemSizeByItemKeyRef.current.has(itemKey)) {
        return;
      }
      itemSizeByItemKeyRef.current.set(itemKey, itemSize);
    },
    []
  );

  return (
    <List
      height={height}
      innerElementType={MList}
      itemCount={values.length}
      itemData={{
        categoryKey,
        onFilter,
        setItemSizeByItemKey,
        values,
      }}
      itemSize={(index): number =>
        itemSizeByItemKey.get(values[index].key) || itemSize
      }
      overscanCount={overscanCount}
      ref={listRef}
      width={width}
    >
      {renderListItem}
    </List>
  );
};
