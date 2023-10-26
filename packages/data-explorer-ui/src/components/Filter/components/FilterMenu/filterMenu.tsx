import React, { useState } from "react";
import {
  CategoryKey,
  SelectCategoryValueView,
} from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { SouthIcon } from "../../../common/CustomIcon/components/SouthIcon/southIcon";
import { MAX_DISPLAYABLE_LIST_ITEMS } from "../../common/constants";
import { List } from "../FilterList/filterList.styles";
import { FilterMenuSearch } from "../FilterMenuSearch/filterMenuSearch";
import { FilterNoResultsFound } from "../FilterNoResultsFound/filterNoResultsFound";
import { VariableSizeList } from "../VariableSizeList/VariableSizeList";
import { Button, FilterView, FilterViewTools } from "./filterMenu.styles";

export interface FilterMenuProps {
  categoryKey: CategoryKey;
  categoryLabel: string;
  isFilterDrawer: boolean;
  menuWidth?: number;
  onCloseFilter: () => void;
  onFilter: OnFilterFn;
  values: SelectCategoryValueView[];
}

export const FilterMenu = ({
  categoryKey,
  categoryLabel,
  isFilterDrawer,
  menuWidth = 312,
  onCloseFilter,
  onFilter,
  values,
}: FilterMenuProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const isSearchable =
    isFilterDrawer || values.length > MAX_DISPLAYABLE_LIST_ITEMS;
  const filteredValues = isSearchable
    ? applyMenuFilter(values, searchTerm)
    : values;
  return (
    <FilterView menuWidth={menuWidth}>
      <FilterViewTools>
        {isFilterDrawer && (
          <Button onClick={onCloseFilter}>
            <SouthIcon fontSize="small" />
            {categoryLabel}
          </Button>
        )}
        {isSearchable && (
          <FilterMenuSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </FilterViewTools>
      {filteredValues.length > 0 ? (
        <VariableSizeList
          categoryKey={categoryKey}
          isFilterDrawer={isFilterDrawer}
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
