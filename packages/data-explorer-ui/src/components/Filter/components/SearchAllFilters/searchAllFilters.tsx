import {
  Autocomplete,
  AutocompleteRenderGroupParams,
  AutocompleteRenderInputParams,
  Checkbox,
  Divider,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import React, { Fragment, useMemo, useState } from "react";
import {
  SelectCategoryValueView,
  SelectCategoryView,
} from "../../../../common/entities";
import { escapeRegExp } from "../../../../common/utils";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { TEXT_BODY_SMALL_400 } from "../../../../theme/common/typography";
import { CheckedIcon } from "../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { FilterNoResultsFound } from "../FilterNoResultsFound/filterNoResultsFound";
import { SearchAllFiltersSearch } from "../SearchAllFiltersSearch/searchAllFiltersSearch";
import { PAPER_PROPS, POPPER_PROPS } from "./common/constants";
import { AutocompleteListbox } from "./components/AutocompleteListbox/autocompleteListbox";
import { AutocompletePopper } from "./components/AutocompletePopper/autocompletePopper";
import { MatchHighlight } from "./searchAllFilters.styles";

// Special option values, for inserting menu content other than actual options
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

const renderGroup = ({
  children,
  group,
  key,
}: AutocompleteRenderGroupParams): JSX.Element => {
  return group ? (
    <Fragment key={key}>
      {Number(key) !== 0 && <Divider />}
      <ListSubheader>{group}</ListSubheader>
      {children}
    </Fragment>
  ) : (
    <Fragment key={key}>{children}</Fragment>
  );
};

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

  const [searchTermRegExp, setSearchTermRegExp] = useState<RegExp | null>(null);

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
          primary={
            <span>
              {searchTermRegExp
                ? markSearchTerm(label, searchTermRegExp)
                : label}
            </span>
          }
          secondary={
            <Typography color="inkLight" variant={TEXT_BODY_SMALL_400}>
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
      ListboxComponent={AutocompleteListbox}
      onInputChange={(event, value): void =>
        setSearchTermRegExp(
          value ? new RegExp(escapeRegExp(value), "ig") : null
        )
      }
      options={options}
      PopperComponent={AutocompletePopper}
      renderGroup={renderGroup}
      renderInput={renderInput}
      renderOption={renderOption}
      slotProps={{
        paper: { ...PAPER_PROPS },
        popper: { ...POPPER_PROPS },
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
  // noOptionsText isn't supported for freeSolo Autocomplete, so simulate with a special option value
  if (filteredOptions.length === 0) return [SPECIAL_OPTION.NO_RESULTS];
  return filteredOptions;
}

function markSearchTerm(
  label: string,
  searchTermRegExp: RegExp
): React.ReactNode {
  let prevIndex = 0;
  return [
    Array.from(label.matchAll(searchTermRegExp), (match, itemIndex) => {
      const [matchText] = match;
      const matchIndex = match.index as number; // type assertion to get around a TypeScript bug: https://github.com/microsoft/TypeScript/issues/36788
      const endIndex = matchIndex + matchText.length;
      const leftChar = label[matchIndex - 1];
      const rightChar = label[endIndex];
      const leftOpen = !leftChar || /\s/.test(leftChar);
      const rightOpen = !rightChar || /\s/.test(rightChar);
      const items = [
        label.substring(prevIndex, matchIndex),
        <MatchHighlight
          key={itemIndex}
          leftOpen={leftOpen}
          rightOpen={rightOpen}
        >
          {matchText}
        </MatchHighlight>,
      ];
      prevIndex = endIndex;
      return items;
    }),
    label.substring(prevIndex),
  ];
}
