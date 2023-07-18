import { List } from "@mui/material";
import React, { forwardRef, HTMLAttributes } from "react";
import { FilterView } from "./searchAllFiltersMenu.styles";

export interface SearchAllFiltersMenuProps extends HTMLAttributes<HTMLElement> {
  menuWidth?: number;
}

export const SearchAllFiltersMenu = forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLElement>
>(function SearchAllFiltersMenu(
  { menuWidth = 312, ...props }: SearchAllFiltersMenuProps,
  ref
): JSX.Element {
  return (
    <FilterView menuWidth={menuWidth}>
      <List ref={ref} {...props} />
    </FilterView>
  );
});
