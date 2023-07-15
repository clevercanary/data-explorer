import {
  Checkbox,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { Fragment, useMemo } from "react";
import {
  SelectCategoryValueView,
  SelectCategoryView,
} from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { CheckedIcon } from "../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { FilterNoResultsFound } from "../FilterNoResultsFound/filterNoResultsFound";
import { SearchAllFiltersMenu } from "../SearchAllFiltersMenu/searchAllFiltersMenu";
import { SearchAllFiltersSearch } from "../SearchAllFiltersSearch/searchAllFiltersSearch";
import {
  GroupHeading,
  SearchAllFilters as Autocomplete,
} from "./searchAllFilters.styles";

enum SPECIAL_OPTION {
  NONE = "SPECIAL_OPTION_NONE",
}

interface SearchAllFiltersProps {
  categoryViews: SelectCategoryView[];
  onFilter: OnFilterFn;
}

interface CategoryValueOption {
  categoryKey: SelectCategoryView["key"];
  categoryLabel: SelectCategoryView["label"];
  value: SelectCategoryValueView;
}

export type FilterOption = CategoryValueOption | SPECIAL_OPTION.NONE;

export const SearchAllFilters = ({
  categoryViews,
  onFilter,
}: SearchAllFiltersProps): JSX.Element => {
  const options = useMemo(
    () =>
      categoryViews
        .map(({ isDisabled, key: categoryKey, label: categoryLabel, values }) =>
          isDisabled
            ? []
            : values.map((value) => ({ categoryKey, categoryLabel, value }))
        )
        .flat(),
    [categoryViews]
  );

  return (
    <Autocomplete
      freeSolo
      options={options}
      renderInput={(params): JSX.Element => (
        <SearchAllFiltersSearch {...params} />
      )}
      PaperComponent={({ children, ...props }): JSX.Element => (
        <SearchAllFiltersMenu PaperProps={props}>
          {children}
        </SearchAllFiltersMenu>
      )}
      filterOptions={applyMenuFilter}
      groupBy={(option): string =>
        typeof option === "string" ? "" : option.categoryLabel
      }
      renderGroup={({ children, group, key }): JSX.Element =>
        group ? (
          <Fragment key={key}>
            <GroupHeading>
              <Typography color="ink" variant="text-body-500">
                {group}
              </Typography>
            </GroupHeading>
            {children}
          </Fragment>
        ) : (
          <Fragment key={key}>{children}</Fragment>
        )
      }
      getOptionLabel={(option): string =>
        typeof option === "string" ? option : option.value.label
      }
      renderOption={(props, option): JSX.Element => {
        if (option === SPECIAL_OPTION.NONE)
          return <FilterNoResultsFound key={SPECIAL_OPTION.NONE} />;
        const {
          categoryKey,
          value: { count, key, label, selected },
        } = option;
        return (
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
        );
      }}
    />
  );
};

function applyMenuFilter(
  options: FilterOption[],
  { inputValue }: { inputValue: string }
): FilterOption[] {
  if (!inputValue) return options;
  inputValue = inputValue.toLowerCase();
  const filteredOptions = options.filter(
    (option) =>
      typeof option !== "string" &&
      (option.value.key?.toLowerCase().includes(inputValue) ||
        option.value.label?.toLowerCase().includes(inputValue))
  );
  if (filteredOptions.length === 0) return [SPECIAL_OPTION.NONE];
  return filteredOptions;
}
