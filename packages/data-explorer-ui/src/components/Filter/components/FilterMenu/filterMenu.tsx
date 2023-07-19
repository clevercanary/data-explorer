import { List } from "@mui/material";
import React, { useState } from "react";
import {
  CategoryKey,
  SelectCategoryValueView,
} from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { MAX_DISPLAYABLE_LIST_ITEMS } from "../../common/constants";
import { FilterMenuSearch } from "../FilterMenuSearch/filterMenuSearch";
import { FilterNoResultsFound } from "../FilterNoResultsFound/filterNoResultsFound";
import { VariableSizeList } from "../VariableSizeList/VariableSizeList";
import { FilterView } from "./filterMenu.styles";

export interface FilterMenuProps {
  categoryKey: CategoryKey;
  menuWidth?: number;
  onFilter: OnFilterFn;
  values: SelectCategoryValueView[];
}

export const FilterMenu = ({
  categoryKey,
  menuWidth = 312,
  onFilter,
  values,
}: FilterMenuProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const isSearchable = values.length > MAX_DISPLAYABLE_LIST_ITEMS;
  const filteredValues = isSearchable
    ? applyMenuFilter(values, searchTerm)
    : values;
  return (
    <FilterView menuWidth={menuWidth}>
      {isSearchable && (
        <FilterMenuSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      {filteredValues.length > 0 ? (
        <VariableSizeList
          categoryKey={categoryKey}
          onFilter={onFilter}
          values={filteredValues}
        />
      ) : (
        <List>
          <FilterNoResultsFound
            onClearSearchTerm={(): void => setSearchTerm("")}
          />
        </List>
      )}
    </FilterView>
  );
};

export function applyMenuFilter(
  values: SelectCategoryValueView[],
  searchTerm: string
): SelectCategoryValueView[] {
  if (!searchTerm) return values;
  searchTerm = searchTerm.toLowerCase();
  return values.filter(
    ({ key, label }) =>
      key?.toLowerCase().includes(searchTerm) ||
      label?.toLowerCase().includes(searchTerm)
  );
}
