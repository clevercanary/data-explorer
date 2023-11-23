import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { useWindowResize } from "../../../../hooks/useWindowResize";
import {
  LIST_ITEM_HEIGHT,
  LIST_MARGIN,
  MAX_DISPLAYABLE_LIST_ITEMS,
  MAX_LIST_HEIGHT_PX,
} from "../../common/constants";
import { List as FilterList } from "../FilterList/filterList.styles";
import VariableSizeListItem from "../VariableSizeListItem/variableSizeListItem";

export type ItemSizeByItemKey = Map<string, number>;

export interface VariableSizeListProps {
  categoryKey: CategoryKey;
  categorySection?: string;
  height?: number; // Height of list; vertical list must be a number.
  isFilterDrawer: boolean;
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
  const {
    categoryKey,
    categorySection,
    onFilter,
    onUpdateItemSizeByItemKey,
    values,
  } = data;
  return (
    <VariableSizeListItem
      categorySection={categorySection}
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
  categorySection,
  height: initHeight = MAX_LIST_HEIGHT_PX,
  isFilterDrawer,
  itemSize = LIST_ITEM_HEIGHT,
  onFilter,
  overscanCount = MAX_DISPLAYABLE_LIST_ITEMS * 2,
  values,
  width = "100%",
}: VariableSizeListProps): JSX.Element => {
  const { height: windowHeight } = useWindowResize();
  const [height, setHeight] = useState<number>(initHeight);
  const itemSizeByItemKeyRef = useRef<ItemSizeByItemKey>(new Map());
  const listRef = useRef<List>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const { current: itemSizeByItemKey } = itemSizeByItemKeyRef;
  const onUpdateItemSizeByItemKey = useCallback(
    (key: string, size: number): void =>
      updateItemSizeByItemKey(itemSizeByItemKeyRef.current, key, size),
    []
  );

  // Sets height of list.
  useEffect(() => {
    setHeight(
      calculateListHeight(
        initHeight,
        values,
        itemSizeByItemKeyRef.current,
        isFilterDrawer,
        windowHeight,
        outerRef.current
      )
    );
  }, [initHeight, isFilterDrawer, values, windowHeight]);

  // Clears VariableSizeList cache (offsets and measurements) when values are updated (filtered).
  // Facilitates correct positioning of list items when list is updated.
  useEffect(() => {
    listRef.current?.resetAfterIndex(0);
  }, [values]);

  return (
    <List
      height={height}
      outerRef={outerRef}
      innerElementType={FilterList}
      itemCount={values.length}
      itemData={{
        categoryKey,
        categorySection,
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
 * Returns given height of list if number of items is greater than max displayable list items, otherwise the minimum
 * height of either the sum of the heights of the filtered list items or the given height of the list.
 * @param height - Specified height of list.
 * @param values - Set of category value view models for the given category.
 * @param itemSizeByItemKey - Map of item size by item key.
 * @param isFilterDrawer - True if filter is displayed in filter drawer.
 * @param windowHeight - Window height.
 * @param outerListElem - Outer list element to reference list position from.
 * @returns calculated height.
 */
function calculateListHeight(
  height: number,
  values: SelectCategoryValueView[],
  itemSizeByItemKey: ItemSizeByItemKey,
  isFilterDrawer: boolean,
  windowHeight: number,
  outerListElem: HTMLDivElement | null
): number {
  if (isFilterDrawer && outerListElem) {
    return windowHeight - outerListElem.getBoundingClientRect().top;
  }
  if (values.length > MAX_DISPLAYABLE_LIST_ITEMS) {
    return height;
  }
  return Math.min(
    values.reduce((acc, { key }) => {
      acc += itemSizeByItemKey.get(key) || LIST_ITEM_HEIGHT;
      return acc;
    }, LIST_MARGIN * 2),
    height
  );
}

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
