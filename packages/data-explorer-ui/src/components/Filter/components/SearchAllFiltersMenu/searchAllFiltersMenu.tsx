import { List, PaperProps } from "@mui/material";
import React, { ReactNode } from "react";
import {
  FilterView,
  SearchAllFiltersMenuPaper,
} from "./searchAllFiltersMenu.styles";

export interface SearchAllFiltersMenuProps {
  children: ReactNode;
  menuWidth?: number;
  PaperProps?: Omit<PaperProps, "children">;
}

export const SearchAllFiltersMenu = ({
  children,
  menuWidth = 312,
  PaperProps,
}: SearchAllFiltersMenuProps): JSX.Element => {
  return (
    <SearchAllFiltersMenuPaper variant="menu" {...(PaperProps || {})}>
      <FilterView menuWidth={menuWidth}>
        <List>{children}</List>
      </FilterView>
    </SearchAllFiltersMenuPaper>
  );
};
