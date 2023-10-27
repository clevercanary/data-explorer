import { Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { ListViewConfig } from "../../../../config/entities";
import { useExploreState } from "../../../../hooks/useExploreState";
import { ROW_DIRECTION } from "../../common/entities";
import { getEditColumnOptions } from "../../common/utils";
import { CheckboxMenu } from "../CheckboxMenu/checkboxMenu";
import { DownloadEntityResults } from "../DownloadEntityResults/downloadEntityResults";
import { EntityViewToggle } from "../EntityViewToggle/entityViewToggle";
import { PaginationSummary } from "../PaginationSummary/paginationSummary";
import { TableToolbar as Toolbar, ToolbarActions } from "./tableToolbar.styles";

export interface TableToolbarProps<T> {
  listView?: ListViewConfig;
  rowDirection: ROW_DIRECTION;
  tableInstance: Table<T>;
}

export const TableToolbar = <T extends object>({
  listView,
  rowDirection,
  tableInstance,
}: TableToolbarProps<T>): JSX.Element => {
  const { exploreState } = useExploreState();
  const { paginationState, relatedListItems } = exploreState;
  const { currentPage, pages, pageSize, rows } = paginationState;
  const { resetColumnVisibility } = tableInstance;
  const { enableDownload } = listView || {};
  const isLastPage = currentPage === pages;
  const editColumnOptions = getEditColumnOptions(tableInstance);
  const showToolbar =
    rowDirection === ROW_DIRECTION.DEFAULT &&
    (editColumnOptions || enableDownload);

  /**
   * Resets column visibility to default state.
   */
  const onResetColumnVisibility = (): void => {
    resetColumnVisibility(false);
  };

  return (
    <Fragment>
      {showToolbar && (
        <Toolbar>
          {relatedListItems ? (
            <EntityViewToggle />
          ) : (
            <PaginationSummary
              firstResult={(currentPage - 1) * pageSize + 1}
              lastResult={isLastPage ? rows : pageSize * currentPage}
              totalResult={rows}
            />
          )}
          <ToolbarActions>
            {enableDownload && (
              <DownloadEntityResults
                entityName={exploreState.tabValue}
                rows={tableInstance.getFilteredRowModel().rows}
              />
            )}
            <CheckboxMenu
              label="Edit Columns"
              onReset={onResetColumnVisibility}
              options={editColumnOptions}
            />
          </ToolbarActions>
        </Toolbar>
      )}
    </Fragment>
  );
};
