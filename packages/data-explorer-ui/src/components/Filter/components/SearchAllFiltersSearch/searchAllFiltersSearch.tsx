import React, { forwardRef } from "react";
import { SearchIcon } from "../../../common/CustomIcon/components/SearchIcon/searchIcon";
import { SetSearchTermFn } from "../../common/entities";
import { SearchAllFiltersSearch as Search } from "./searchAllFiltersSearch.styles";

export interface SearchAllFiltersSearchProps {
  searchTerm: string;
  setSearchTerm: SetSearchTermFn;
}

export const SearchAllFiltersSearch = forwardRef(
  function SearchAllFiltersSearch(
    { searchTerm, setSearchTerm }: SearchAllFiltersSearchProps,
    ref
  ): JSX.Element {
    return (
      <Search
        placeholder="Search all filters"
        ref={ref}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        StartAdornment={SearchIcon}
      />
    );
  }
);
