import { ColumnSort } from "@tanstack/react-table";
import { AzulSearchIndex } from "../apis/azul/common/entities";
import { SelectCategory, SelectedFilter } from "../common/entities";

/**
 * Entity view.
 */
export enum EntityView {
  EXACT = "EXACT",
  RELATED = "RELATED",
}

/**
 * List items.
 */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO revisit when adding react query or similar
export type ListItems = any[] | undefined;

/**
 * Pagination index.
 */
export interface PaginationIndex {
  type: AzulSearchIndex;
  value: string | null;
}

/**
 * Pagination state.
 */
export interface PaginationState {
  currentPage: number;
  index: PaginationIndex | null;
  nextIndex: PaginationIndex | null;
  pages: number;
  pageSize: number;
  previousIndex: PaginationIndex | null;
  rows: number;
}

/**
 * Related list items.
 */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO revisit when adding react query or similar
export type RelatedListItems = any[] | undefined;

/**
 * Explore state.
 */
export type ExploreState = {
  categoryViews: SelectCategory[];
  filterState: SelectedFilter[];
  isRelatedView: boolean;
  listItems: ListItems;
  listStaticLoad: boolean;
  listView: EntityView | undefined;
  loading: boolean;
  paginationState: PaginationState;
  relatedListItems: RelatedListItems;
  sorting: ColumnSort[];
  tabValue: string;
};
