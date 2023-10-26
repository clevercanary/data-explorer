import {
  AlertTitle,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import {
  ColumnDef,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  InitialTableState,
  TableState,
  Updater,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import React, { useCallback, useEffect } from "react";
import { track } from "../../common/analytics/analytics";
import {
  EVENT_NAME,
  EVENT_PARAM,
  PAGINATION_DIRECTION,
  SORT_DIRECTION,
} from "../../common/analytics/entities";
import { Pagination } from "../../common/entities";
import { ListViewConfig } from "../../config/entities";
import { useExploreState } from "../../hooks/useExploreState";
import { useScroll } from "../../hooks/useScroll";
import { EntityView, ExploreActionKind } from "../../providers/exploreState";
import { FluidPaper, GridPaper } from "../common/Paper/paper.styles";
import { NoResults } from "../NoResults/noResults";
import {
  buildCategoryViews,
  getEditColumnOptions,
  getFacetedUniqueValuesWithArrayValues,
  getGridTemplateColumns,
  getTableSortLabelProps,
} from "./common/utils";
import { CheckboxMenu } from "./components/CheckboxMenu/checkboxMenu";
import { DownloadEntityResults } from "./components/DownloadEntityResults/downloadEntityResults";
import { EntityViewToggle } from "./components/EntityViewToggle/entityViewToggle";
import { Pagination as DXPagination } from "./components/Pagination/pagination";
import { PaginationSummary } from "./components/PaginationSummary/paginationSummary";
import {
  Alert,
  Table as GridTable,
  TableToolbar,
  ToolbarActions,
} from "./table.styles";

export interface TableProps<T extends object> {
  columns: ColumnDef<T>[];
  count?: number;
  initialState: InitialTableState;
  items: T[];
  listView?: ListViewConfig;
  loading?: boolean;
  pages?: number;
  pageSize: number;
  pagination?: Pagination;
  staticallyLoaded?: boolean;
  total?: number;
}

/**
 * This table can be Controlled or Uncontrolled based on the set of props passed to it.
 * Controlled table will receive the navigation functions, and it will be used for dynamic loads.
 * Uncontrolled table will take advantage of React Table's state and will be used for static loads.
 * @param tableProps - Set of props required for displaying the table.
 * @param tableProps.columns - Set of columns to display.
 * @param tableProps.initialState - Initial table state.
 * @param tableProps.items - Row data to display.
 * @param tableProps.listView - List view configuration.
 * @param tableProps.total - Total number of rows in the result set.
 * @returns Configured table element for display.
 */
export const TableComponent = <T extends object>({
  columns,
  initialState,
  items,
  listView,
  total,
}: // eslint-disable-next-line sonarjs/cognitive-complexity -- TODO fix component length / complexity
TableProps<T>): JSX.Element => {
  const { exploreDispatch, exploreState } = useExploreState();
  const {
    entityPageState,
    filterState,
    isRelatedView,
    listItems,
    listStaticLoad,
    loading,
    paginationState,
    relatedListItems,
    tabValue,
  } = exploreState;
  const { columnsVisibility, sorting } = entityPageState[tabValue];
  const { currentPage, pages, pageSize, rows } = paginationState;
  const { disablePagination = false, enableDownload } = listView || {};
  const onSortingChange = (updater: Updater<ColumnSort[]>): void => {
    exploreDispatch({
      payload: typeof updater === "function" ? updater(sorting) : updater,
      type: ExploreActionKind.UpdateSorting,
    });
    // Execute GTM tracking.
    track(EVENT_NAME.ENTITY_TABLE_SORTED, {
      [EVENT_PARAM.ENTITY_NAME]: exploreState.tabValue,
      [EVENT_PARAM.COLUMN_NAME]: sorting[0].id,
      [EVENT_PARAM.SORT_DIRECTION]: sorting[0].desc
        ? SORT_DIRECTION.DESC
        : SORT_DIRECTION.ASC,
    });
  };

  const onColumnVisibilityChange = (
    updater: Updater<VisibilityState>
  ): void => {
    exploreDispatch({
      payload:
        typeof updater === "function" ? updater(columnsVisibility) : updater,
      type: ExploreActionKind.UpdateColumnVisibility,
    });
  };

  const state: Partial<TableState> = {
    columnVisibility: columnsVisibility,
    pagination: {
      pageIndex: 0,
      pageSize: disablePagination ? Number.MAX_SAFE_INTEGER : pageSize,
    },
    sorting,
  };
  const tableInstance = useReactTable({
    columns,
    data: items,
    enableColumnFilters: true, // listStaticLoad,
    enableFilters: true, // listStaticLoad,
    enableMultiSort: false,
    enableSorting: true, // listStaticLoad
    enableSortingRemoval: false, // listStaticLoad
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: listStaticLoad ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: listStaticLoad
      ? getFacetedUniqueValuesWithArrayValues()
      : undefined,
    getFilteredRowModel: listStaticLoad ? getFilteredRowModel() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: listStaticLoad ? getSortedRowModel() : undefined,
    initialState,
    manualPagination: listStaticLoad,
    manualSorting: !listStaticLoad,
    onColumnVisibilityChange,
    onSortingChange,
    pageCount: total,
    state,
  });
  const {
    getAllColumns,
    getHeaderGroups,
    getRowModel,
    getState,
    getVisibleFlatColumns,
    nextPage: tableNextPage,
    previousPage: tablePreviousPage,
    resetColumnVisibility,
  } = tableInstance;
  const allColumns = getAllColumns();
  const { columnFilters } = getState();
  const { rows: results } = getRowModel();
  const noResults = !loading && (!results || results.length === 0);
  const scrollTop = useScroll();
  const isLastPage = currentPage === pages;
  const editColumnOptions = getEditColumnOptions(tableInstance);
  const visibleColumns = getVisibleFlatColumns();
  const gridTemplateColumns = getGridTemplateColumns(visibleColumns);
  const estimateSize = useCallback(() => 100, []);
  const virtualizer = useWindowVirtualizer({
    count: results.length,
    estimateSize,
    measureElement: (element) =>
      element.children[0]?.getBoundingClientRect().height || 0, // The row doesn't have a box, so measure the first cell instead
    overscan: 20,
  });
  const virtualSize = virtualizer.getTotalSize();
  const virtualItems = virtualizer.getVirtualItems();
  const virtualizerPaddingTop =
    virtualItems.length > 0 ? virtualItems?.[0]?.start || 0 : 0;
  const virtualizerPaddingBottom =
    virtualItems.length > 0
      ? virtualSize - (virtualItems?.[virtualItems.length - 1]?.end || 0)
      : 0;

  const handleTableNextPage = (): void => {
    let nextPage = tableNextPage;
    if (!listStaticLoad) {
      nextPage = (): void => {
        exploreDispatch({
          payload: "next",
          type: ExploreActionKind.PaginateTable,
        });
      };
      // Execute GTM tracking.
      track(EVENT_NAME.ENTITY_TABLE_PAGINATED, {
        [EVENT_PARAM.ENTITY_NAME]: exploreState.tabValue,
        [EVENT_PARAM.PAGINATION_DIRECTION]: PAGINATION_DIRECTION.NEXT,
      });
    }
    // const nextPage = pagination?.nextPage ?? tableNextPage;
    nextPage();
    scrollTop();
  };

  const handleTablePreviousPage = (): void => {
    //const previousPage = pagination?.previousPage ?? tablePreviousPage;
    let previousPage = tablePreviousPage;
    if (!listStaticLoad) {
      previousPage = (): void => {
        exploreDispatch({
          payload: "prev",
          type: ExploreActionKind.PaginateTable,
        });
      };
      track(EVENT_NAME.ENTITY_TABLE_PAGINATED, {
        [EVENT_PARAM.ENTITY_NAME]: exploreState.tabValue,
        [EVENT_PARAM.PAGINATION_DIRECTION]: PAGINATION_DIRECTION.PREV,
      });
    }
    previousPage();
    scrollTop();
  };

  // Sets or resets react table column filters `columnFilters` state, for statically loaded api only, with update of filterState.
  // - `columnFilters` state is "cleared" for related view, and
  // - `columnFilters` state is "set" for all other views.
  useEffect(() => {
    if (listStaticLoad) {
      if (isRelatedView) {
        tableInstance.resetColumnFilters();
      } else {
        tableInstance.setColumnFilters(
          filterState.map(({ categoryKey, value }) => ({
            id: categoryKey,
            value,
          }))
        );
      }
    }
  }, [filterState, isRelatedView, listStaticLoad, tableInstance]);

  /**
   * Static List Mode - Process Explore Response
   */
  useEffect(() => {
    if (!isRelatedView && listStaticLoad) {
      exploreDispatch({
        payload: {
          listItems,
          loading: false,
          paginationResponse: {
            nextIndex: null,
            pageSize: results.length,
            pages: 1,
            previousIndex: null,
            rows: results.length,
          },
          selectCategories: buildCategoryViews(allColumns, columnFilters),
        },
        type: ExploreActionKind.ProcessExploreResponse,
      });
    }
  }, [
    allColumns,
    columnFilters,
    exploreDispatch,
    isRelatedView,
    listItems,
    listStaticLoad,
    results,
  ]);

  // Unmount - reset entity view to "exact".
  useEffect(() => {
    return () => {
      exploreDispatch({
        payload: EntityView.EXACT,
        type: ExploreActionKind.ToggleEntityView,
      });
    };
  }, [exploreDispatch]);

  function canNextPage(): boolean {
    return currentPage < pages;
  }

  function canPreviousPage(): boolean {
    return currentPage > 1;
  }

  /**
   * Resets column visibility to default state.
   */
  const onResetColumnVisibility = (): void => {
    resetColumnVisibility(false);
  };

  return noResults ? (
    <NoResults title={"No Results found"} />
  ) : (
    <FluidPaper>
      <GridPaper>
        {editColumnOptions && (
          <TableToolbar>
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
          </TableToolbar>
        )}
        {isRelatedView && (
          <Alert severity="info" variant="banner">
            <AlertTitle>
              Dug has identified the following studies as mentioning the
              selected focus/disease or related term in the study description.
            </AlertTitle>
          </Alert>
        )}
        <TableContainer>
          <GridTable gridTemplateColumns={gridTemplateColumns}>
            {getHeaderGroups().map((headerGroup) => (
              <TableHead key={headerGroup.id}>
                <TableRow>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      <TableSortLabel
                        {...getTableSortLabelProps(header.column)}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            ))}
            <TableBody>
              {virtualizerPaddingTop > 0 && (
                <tr>
                  <td
                    style={{
                      gridColumn: `span ${visibleColumns.length}`,
                      height: `${virtualizerPaddingTop}px`,
                    }}
                  ></td>
                </tr>
              )}
              {virtualItems.map((virtualRow) => {
                const row = results[virtualRow.index];
                return (
                  <TableRow
                    key={row.id}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {virtualizerPaddingBottom > 0 && (
                <tr>
                  <td
                    style={{
                      gridColumn: `span ${visibleColumns.length}`,
                      height: `${virtualizerPaddingBottom}px`,
                    }}
                  ></td>
                </tr>
              )}
            </TableBody>
          </GridTable>
        </TableContainer>
        {!disablePagination && (
          <DXPagination
            canNextPage={canNextPage()}
            canPreviousPage={canPreviousPage()}
            currentPage={currentPage}
            onNextPage={handleTableNextPage}
            onPreviousPage={handleTablePreviousPage}
            totalPage={pages ?? 0}
          />
        )}
      </GridPaper>
    </FluidPaper>
  );
};

// TODO(Dave) review whether memo is necessary - flash between tabs / loading state.
export const Table = React.memo(TableComponent) as typeof TableComponent;
