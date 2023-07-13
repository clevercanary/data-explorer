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
import {
  FilterView,
  ListPadding,
  MAX_DISPLAYABLE_LIST_ITEMS,
  VirtuosoList,
} from "./filterMenu.styles";

export interface FilterMenuProps {
  categoryKey: CategoryKey;
  menuWidth?: number;
  onFilter: OnFilterFn;
  values: SelectCategoryValueView[];
}

const muiComponents = {
  List: React.forwardRef<HTMLDivElement>(function MuiList(props, ref) {
    return <List {...props} component="div" ref={ref} />;
  }),
};

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

  /**
   * Get filtered value by list item index, accounting for padding items
   * @param index - List item index
   * @returns SelectCategoryValueView for the given index
   */
  function getFilteredValue(index: number): SelectCategoryValueView {
    return filteredValues[index - 1];
  }

  /**
   * Get key for padding list item at the start or end of the list
   * @param index - List item index
   * @returns Start/end list item key, or null if the index is not at either edge
   */
  function getListEdge(index: number): string | null {
    return index === 0
      ? "LIST_EDGE_START"
      : index === filteredValues.length + 1
      ? "LIST_EDGE_END"
      : null;
  }

  return (
    <FilterView menuWidth={menuWidth}>
      {isSearchable && (
        <FilterMenuSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      {filteredValues.length > 0 ? (
        <VirtuosoList
          components={muiComponents}
          totalCount={filteredValues.length + 2} // add 2 for padding items
          defaultItemHeight={40}
          increaseViewportBy={200}
          computeItemKey={(index): string =>
            getListEdge(index) || getFilteredValue(index).key
          }
          itemContent={(index): JSX.Element => {
            if (getListEdge(index)) return <ListPadding />;
            const { count, key, label, selected } = getFilteredValue(index);
            return (
              <ListItemButton
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
            );
          }}
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
