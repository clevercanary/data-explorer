import { List } from "@mui/material";
import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import { FilterView } from "./searchAllFiltersMenu.styles";

export interface SearchAllFiltersMenuProps {
  children?: ReactNode;
  menuWidth?: number;
}

export const SearchAllFiltersMenu = forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLElement>
>(function SearchAllFiltersMenu(
  { children, menuWidth = 312 }: SearchAllFiltersMenuProps,
  ref
): JSX.Element {
  return (
    <FilterView menuWidth={menuWidth}>
      <List ref={ref}>{children}</List>
    </FilterView>
  );
});
