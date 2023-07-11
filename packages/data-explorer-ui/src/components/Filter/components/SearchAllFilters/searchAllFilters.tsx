import { Paper } from "@mui/material";
import React, { useRef, useState } from "react";
import { SelectCategoryView } from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { SearchAllFiltersMenu } from "../SearchAllFiltersMenu/searchAllFiltersMenu";
import { SearchAllFiltersSearch } from "../SearchAllFiltersSearch/searchAllFiltersSearch";
import { FilterPopper } from "./searchAllFilters.styles";

interface SearchAllFiltersProps {
  categoryViews: SelectCategoryView[];
  onFilter: OnFilterFn;
}

export const SearchAllFilters = ({
  categoryViews,
  onFilter,
}: SearchAllFiltersProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [openPopper, setOpenPopper] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Closes filter popper.
   */
  const closeFilter = (): void => {
    setOpenPopper(false);
  };

  /**
   * Opens filter popper.
   */
  const openFilter = (): void => {
    setOpenPopper(true);
  };

  if (searchTerm) {
    if (!openPopper) openFilter();
  } else {
    if (openPopper) closeFilter();
  }

  const filteredCategoryViews = applyMenuFilter(categoryViews, searchTerm);

  return (
    <>
      <SearchAllFiltersSearch
        ref={inputRef}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <FilterPopper
        anchorEl={inputRef.current}
        placement="bottom-start"
        open={openPopper}
      >
        <Paper variant="menu">
          <SearchAllFiltersMenu
            filteredCategoryViews={filteredCategoryViews}
            onFilter={onFilter}
            setSearchTerm={setSearchTerm}
          />
        </Paper>
      </FilterPopper>
    </>
  );
};

function applyMenuFilter(
  categoryViews: SelectCategoryView[],
  searchTerm: string
): SelectCategoryView[] {
  if (!searchTerm) return [];
  searchTerm = searchTerm.toLowerCase();
  return categoryViews.reduce((filteredCategoryViews, category) => {
    if (!category.isDisabled) {
      const filteredValues = category.values.filter(
        ({ key, label }) =>
          key?.toLowerCase().includes(searchTerm) ||
          label?.toLowerCase().includes(searchTerm)
      );
      if (filteredValues.length)
        filteredCategoryViews.push({ ...category, values: filteredValues });
    }
    return filteredCategoryViews;
  }, [] as SelectCategoryView[]);
}
