import {
  Checkbox,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import {
  SelectCategoryValueView,
  SelectCategoryView,
} from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { CheckedIcon } from "../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { SetSearchTermFn } from "../../common/entities";
import { FilterNoResultsFound } from "../FilterNoResultsFound/filterNoResultsFound";
import { FilterView } from "./searchAllFiltersMenu.styles";

export interface SearchAllFiltersMenuProps {
  filteredCategoryViews: SelectCategoryView[];
  menuWidth?: number;
  onFilter: OnFilterFn;
  setSearchTerm: SetSearchTermFn;
}

export const SearchAllFiltersMenu = ({
  filteredCategoryViews,
  menuWidth = 312,
  onFilter,
  setSearchTerm,
}: SearchAllFiltersMenuProps): JSX.Element => {
  return (
    <FilterView menuWidth={menuWidth}>
      <List>
        {filteredCategoryViews.length > 0 ? (
          filteredCategoryViews.map(
            (
              {
                key: categoryKey,
                label: categoryLabel,
                values: filteredValues,
              },
              index
            ) => (
              <Fragment key={categoryKey}>
                {index ? <Divider /> : ""}
                <Typography color="ink" variant="text-body-500">
                  {categoryLabel}
                </Typography>
                {filteredValues.map(({ count, key, label, selected }) => (
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
                        <Typography
                          color="inkLight"
                          variant="text-body-small-400"
                        >
                          {count}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                ))}
              </Fragment>
            )
          )
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
