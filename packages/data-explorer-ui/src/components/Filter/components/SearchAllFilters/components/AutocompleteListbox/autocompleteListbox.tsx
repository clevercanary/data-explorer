import { ListProps as MListProps } from "@mui/material";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useWindowResize } from "../../../../../../hooks/useWindowResize";
import { LIST_MARGIN } from "../../../../common/constants";
import { DEFAULT_LIST_HEIGHT } from "../../common/constants";
import { List } from "./autocompleteListbox.styles";

export const AutocompleteListbox = forwardRef<HTMLUListElement, MListProps>(
  function AutocompleteListbox(
    { ...props }: MListProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO use ref with VariableSizeList.
    ref
  ): JSX.Element {
    const { children, ...listProps } = props;
    const { height: windowHeight } = useWindowResize();
    const listRef = useRef<HTMLUListElement>(null); // TODO assign ref to VariableSizeList innerRef prop.
    const [height, setHeight] = useState<number>(DEFAULT_LIST_HEIGHT);

    // Sets height of list.
    useEffect(() => {
      if (listRef.current) {
        setHeight(calculateListHeight(listRef.current, windowHeight));
      }
    }, [children, windowHeight]);

    return (
      <List ref={listRef} sx={{ height }} {...listProps}>
        {children}
      </List>
    );
  }
);

/**
 * Calculates list height, either to fit available window size, or if the list is filtered, a calculated height based on
 * first and last rendered list element position.
 * @param listEl - List element.
 * @param windowHeight - Window height.
 * @returns calculated height.
 */
function calculateListHeight(
  listEl: HTMLUListElement,
  windowHeight: number
): number {
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
  return maxHeight;
}
