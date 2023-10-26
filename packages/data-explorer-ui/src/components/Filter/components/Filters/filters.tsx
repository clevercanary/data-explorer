import { Divider } from "@mui/material";
import React, { Fragment } from "react";
import { CategoryTag, SelectCategoryView } from "../../../../common/entities";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { DESKTOP_SM } from "../../../../theme/common/breakpoints";
import { Filter } from "../Filter/filter";
import { FilterTags } from "../FilterTags/filterTags";
import { Filters as FilterList } from "./filters.styles";

export interface CategoryFilter {
  categoryViews: SelectCategoryView[];
  label?: string;
}

export interface FiltersProps {
  categoryFilters: CategoryFilter[];
  closeAncestor?: () => void;
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

export const Filters = ({
  categoryFilters,
  closeAncestor,
  disabled = false,
  onFilter,
}: FiltersProps): JSX.Element => {
  const isFilterDrawer = useBreakpointHelper(
    BREAKPOINT_FN_NAME.DOWN,
    DESKTOP_SM
  );
  return (
    <FilterList disabled={disabled}>
      {categoryFilters.map(({ categoryViews }, i) => (
        <Fragment key={i}>
          {i !== 0 && <Divider />}
          {categoryViews.map((categoryView) => (
            <Filter
              key={categoryView.key}
              categoryView={categoryView}
              closeAncestor={closeAncestor}
              isFilterDrawer={isFilterDrawer}
              onFilter={onFilter}
              tags={renderFilterTags(categoryView, onFilter)}
            />
          ))}
        </Fragment>
      ))}
    </FilterList>
  );
};
