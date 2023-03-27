import {
  Checkbox,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  CategoryKey,
  SelectCategoryValueView,
} from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { CheckedIcon } from "../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { FilterMenuSearch } from "../FilterMenuSearch/filterMenuSearch";
import { FilterNoResultsFound } from "../FilterNoResultsFound/filterNoResultsFound";
import { FilterView, MAX_DISPLAYABLE_LIST_ITEMS } from "./filterMenu.styles";

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
      <List>
        {filteredValues.length > 0 ? (
          filteredValues.map(({ count, key, label, selected }) => (
            <ListItemButton
              key={key}
              onClick={(): void => onFilter(categoryKey, key, !selected)}
              selected={selected}
            >
              <Checkbox
                checked={selected}
                checkedIcon={<CheckedIcon />}
                icon={<UncheckedIcon />}
              />
              <ListItemText
                disableTypography
                primary={<span>{label}</span>}
                secondary={
                  <Typography color="inkLight" variant="text-body-small-400">
                    {count}
                  </Typography>
                }
              />
            </ListItemButton>
          ))
        ) : (
          <FilterNoResultsFound
            onClearSearchTerm={(): void => setSearchTerm("")}
          />
        )}
      </List>
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
