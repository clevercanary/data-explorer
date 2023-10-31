import { ExploreState, PaginationState } from "./exploreState";

// Template constants
export const DEFAULT_PAGINATION_STATE: PaginationState = {
  currentPage: 1,
  index: null,
  nextIndex: null,
  pageSize: 25,
  pages: 1,
  previousIndex: null,
  rows: 0,
};

// Initial state
export const INITIAL_STATE: ExploreState = {
  categoryViews: [],
  entityPageState: {},
  filterState: [],
  isRelatedView: false,
  listItems: [],
  listStaticLoad: false,
  listView: undefined,
  loading: false,
  paginationState: DEFAULT_PAGINATION_STATE,
  relatedListItems: undefined,
  staticLoaded: false,
  tabValue: "",
};
