import { ButtonProps, Divider } from "@mui/material";
import React, { Fragment } from "react";
import { CategoryTag, SelectCategoryView } from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { Filter } from "../Filter/filter";
import { FilterLabel } from "../FilterLabel/filterLabel";
import { FilterMenu } from "../FilterMenu/filterMenu";
import { FilterTags } from "../FilterTags/filterTags";
import { Filters as FilterList } from "./filters.styles";

export interface CategoryFilter {
  categoryViews: SelectCategoryView[];
  label?: string;
}

export interface FiltersProps {
  categoryFilters: CategoryFilter[];
  disabled: boolean; // Global disabling of filters; typically in "related" entity view.
  onFilter: OnFilterFn;
}

/**
 * Returns set of selected category tags with tag label (the selected metadata label) and corresponding Tag onRemove function.
 * @param categoryView - View model of category to display.
 * @param onFilter - Function to execute on select of category value or remove of selected category value.
 * @returns Array of selected category tags.
 */
function buildSelectCategoryTags(
  categoryView: SelectCategoryView,
  onFilter: OnFilterFn
): CategoryTag[] {
  const { key: categoryKey, values } = categoryView;
  return values
    .filter(({ selected }) => selected)
    .map(({ key: categoryValueKey, label, selected }) => {
      return {
        label: label,
        onRemove: () => onFilter(categoryKey, categoryValueKey, !selected),
        superseded: false,
      };
    });
}

/**
 * Build filter menu element for the given category type.
 * @param categoryView - View model of category to display.
 * @param onFilter - Function to execute on select of category value or remove of selected category value.
 * @returns Filter menu element displaying category values and their corresponding selected state.
 */
function renderFilterMenu(
  categoryView: SelectCategoryView,
  onFilter: OnFilterFn
): JSX.Element {
  const { key, values } = categoryView;
  return <FilterMenu categoryKey={key} onFilter={onFilter} values={values} />;
}

/**
 * Build selected filter tags element for the given category type.
 * @param categoryView - View model of category to display.
 * @param onFilter - Function to execute on select of category value or remove of selected category value.
 * @returns Filter tags element displaying selected category values.
 */
function renderFilterTags(
  categoryView: SelectCategoryView,
  onFilter: OnFilterFn
): JSX.Element {
  const tags = buildSelectCategoryTags(categoryView, onFilter);
  return <FilterTags tags={tags} />;
}

/**
 * Build the filter target for the given category type.
 * @param categoryView - View model of category to display.
 * @param props - Button props e.g. "onClick" used to set filter popover state to "open".
 * @returns Filter target element displaying filter label and count.
 */
function renderFilterTarget(
  categoryView: SelectCategoryView,
  props: ButtonProps
): JSX.Element {
  const { isDisabled = false, label } = categoryView;
  return (
    <FilterLabel
      disabled={isDisabled}
      label={label}
      count={categoryView.values.length}
      {...props}
    />
  );
}

export const Filters = ({
  categoryFilters,
  disabled = false,
  onFilter,
}: FiltersProps): JSX.Element => {
  return (
    <FilterList disabled={disabled}>
      {categoryFilters.map(({ categoryViews }, i) => (
        <Fragment key={i}>
          {i !== 0 && <Divider />}
          {categoryViews.map((categoryView) => (
            <Filter
              content={renderFilterMenu(categoryView, onFilter)}
              key={categoryView.key}
              tags={renderFilterTags(categoryView, onFilter)}
              Target={(props): JSX.Element =>
                renderFilterTarget(categoryView, props)
              }
            />
          ))}
        </Fragment>
      ))}
    </FilterList>
  );
};
