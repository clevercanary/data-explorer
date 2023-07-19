import {
  AutocompleteRenderGroupParams,
  AutocompleteRenderInputParams,
  Checkbox,
  ListItemButton,
  ListItemText,
  PaperProps,
  Popper,
  PopperProps,
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
  GroupDivider,
  GroupHeading,
  SearchAllFilters as Autocomplete,
  SearchAllFiltersMenuPaper,
} from "./searchAllFilters.styles";

// Special option values, for insterting menu content other than actual options
enum SPECIAL_OPTION {
  NO_RESULTS = "SPECIAL_OPTION_NO_RESULTS",
}

export interface SearchAllFiltersProps {
  categoryViews: SelectCategoryView[];
  onFilter: OnFilterFn;
}

interface CategoryValueOption {
  categoryKey: SelectCategoryView["key"];
  categoryLabel: SelectCategoryView["label"];
  value: SelectCategoryValueView;
}

export type FilterOption = CategoryValueOption | SPECIAL_OPTION;

const PaperComponent = (props: PaperProps): JSX.Element => (
  <SearchAllFiltersMenuPaper variant="menu" {...props} />
);

const PopperComponent = ({ modifiers, ...props }: PopperProps): JSX.Element => (
  <Popper
    modifiers={[
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
      ...(modifiers || []),
    ]}
    {...props}
  />
);

const renderGroup = ({
  children,
  group,
  key,
}: AutocompleteRenderGroupParams): JSX.Element =>
  group ? (
    <Fragment key={key}>
      <GroupDivider />
      <GroupHeading>
        <Typography color="ink" variant="text-body-500">
          {group}
        </Typography>
      </GroupHeading>
      {children}
    </Fragment>
  ) : (
    <Fragment key={key}>{children}</Fragment>
  );

const renderInput = (params: AutocompleteRenderInputParams): JSX.Element => (
  <SearchAllFiltersSearch {...params} />
);

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

  const renderOption = (props: unknown, option: FilterOption): JSX.Element => {
    if (option === SPECIAL_OPTION.NO_RESULTS)
      return <FilterNoResultsFound key={SPECIAL_OPTION.NO_RESULTS} />;
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
  };

  return (
    <Autocomplete
      filterOptions={applyMenuFilter}
      freeSolo
      getOptionLabel={(option): string =>
        typeof option === "string" ? option : option.value.label
      }
      groupBy={(option): string =>
        typeof option === "string" ? "" : option.categoryLabel
      }
      ListboxComponent={SearchAllFiltersMenu}
      options={options}
      PaperComponent={PaperComponent}
      PopperComponent={PopperComponent}
      renderGroup={renderGroup}
      renderInput={renderInput}
      renderOption={renderOption}
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
  // noOptionsText isn't supported for freeSolo Autocomplete, so simulate with a special option value
  if (filteredOptions.length === 0) return [SPECIAL_OPTION.NO_RESULTS];
  return filteredOptions;
}
