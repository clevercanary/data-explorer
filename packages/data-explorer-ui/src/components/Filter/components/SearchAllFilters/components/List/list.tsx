import { ListProps as MListProps } from "@mui/material";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useWindowResize } from "../../../../../../hooks/useWindowResize";
import { LIST_MARGIN } from "../../../../common/constants";
import { List as FilterList } from "./list.styles";

export const DEFAULT_LIST_HEIGHT = 0;

export const List = forwardRef<HTMLUListElement, MListProps>(function List(
  { ...props }: MListProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO use ref with VariableSizeList and assign listRef to innerRef.
  ref
): JSX.Element {
  const listRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState<number>(DEFAULT_LIST_HEIGHT);
  const { height: windowHeight } = useWindowResize();

  // Sets height of list.
  useEffect(() => {
    setHeight(calculateListHeight(listRef.current, windowHeight));
  }, [props.children, windowHeight]);

  // Sets body overflow style; prevents body scrolling when autocomplete is open.
  useEffect(() => {
    const body = document.querySelector("body");
    setBodyOverflowStyle(body, "hidden");
    return () => {
      setBodyOverflowStyle(body, "");
    };
  }, []);

  return <FilterList ref={listRef} sx={{ height }} {...props} />;
});

/**
 * Calculates list height, either to fit available window size, or if the list is filtered, a calculated height based on
 * first and last rendered list element position.
 * @param listEl - List element.
 * @param windowHeight - Window height.
 * @returns calculated height.
 */
function calculateListHeight(
  listEl: HTMLUListElement | null,
  windowHeight: number
): number {
  if (listEl) {
    // Calculate max possible list height, based on window height and top position of the list element.
    const maxHeight = windowHeight - listEl.getBoundingClientRect().top;
    // Grab the first and last element in the list.
    const { firstElementChild: firstListEl, lastElementChild: lastListEl } =
      listEl;
    // Grab the scroll position to adjust calculated list height.
    const { scrollTop } = listEl;
    if (firstListEl && lastListEl) {
      const { top } = firstListEl.getBoundingClientRect();
      const { bottom } = lastListEl.getBoundingClientRect();
      const calcHeight = bottom - top - scrollTop + LIST_MARGIN * 2;
      return Math.min(calcHeight, maxHeight);
    }
  }
  return DEFAULT_LIST_HEIGHT;
}

/**
 * Sets body element overflow style.
 * @param bodyEl - Body element.
 * @param overflowStyle - Overflow style value.
 */
function setBodyOverflowStyle(
  bodyEl: HTMLBodyElement | null,
  overflowStyle: string
): void {
  if (bodyEl) bodyEl.style.overflow = overflowStyle;
}
