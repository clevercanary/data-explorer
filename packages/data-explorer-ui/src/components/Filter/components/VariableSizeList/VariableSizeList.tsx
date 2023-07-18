import { List as MList } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
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
  const { categoryKey, onFilter, onUpdateItemSizeByItemKey, values } = data;
  return (
    <VariableSizeListItem
      categoryKey={categoryKey}
      listItem={values[index]}
      onFilter={onFilter}
      onUpdateItemSizeByItemKey={onUpdateItemSizeByItemKey}
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
  const onUpdateItemSizeByItemKey = useCallback(
    (key: string, size: number): void =>
      updateItemSizeByItemKey(itemSizeByItemKeyRef.current, key, size),
    []
  );

  // Clears VariableSizeList cache (offsets and measurements) when values are updated (filtered).
  // Facilitates correct positioning of list items when list is updated.
  useEffect(() => {
    listRef.current?.resetAfterIndex(0);
  }, [values]);

  return (
    <List
      height={height}
      innerElementType={MList}
      itemCount={values.length}
      itemData={{
        categoryKey,
        onFilter,
        onUpdateItemSizeByItemKey,
        values,
      }}
      itemSize={(index): number =>
        itemSizeByItemKey.get(values[index].key) || itemSize
      }
      onItemsRendered={(): void => listRef.current?.resetAfterIndex(0)} // Facilitates correct positioning of list items when list scrolls.
      overscanCount={overscanCount}
      ref={listRef}
      width={width}
    >
      {renderListItem}
    </List>
  );
};

/**
 * Updates map of item size by item key.
 * @param itemSizeByItemKey - Map of item size by item key.
 * @param key - Key.
 * @param size - Item size.
 */
function updateItemSizeByItemKey(
  itemSizeByItemKey: ItemSizeByItemKey,
  key: string,
  size: number
): void {
  if (itemSizeByItemKey.has(key)) {
    return;
  }
  itemSizeByItemKey.set(key, size);
}
