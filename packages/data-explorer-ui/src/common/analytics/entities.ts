// eslint-disable-next-line @typescript-eslint/no-explicit-any -- We can't determine the data layer type.
export type DataLayer = any;

/**
 * Set of analytics event actions.
 */
export enum EVENT_NAME {
  CTA_BUTTON_CLICKED = "CTA_BUTTON_CLICKED",
  ENTITY_SELECTED = "ENTITY_SELECTED",
  ENTITY_TABLE_PAGINATED = "ENTITY_TABLE_PAGINATED",
  ENTITY_TABLE_SORTED = "ENTITY_TABLE_SORTED",
  FILTER_SELECTED = "FILTER_SELECTED",
}

/**
 * Set of analytics event parameters.
 */
export enum EVENT_PARAM {
  COLUMN_NAME = "columnName",
  CTA_BUTTON_CLICKED = "ctaButtonClicked",
  ENTITY_NAME = "entityName",
  FILTER_NAME = "filterName",
  FILTER_VALUE = "filterValue",
  PAGINATION_DIRECTION = "paginationDirection",
  SORT_DIRECTION = "sortDirection",
}

/**
 * Model of event parameters mapped to the event name.
 */
export type EventParams = {
  [EVENT_NAME.CTA_BUTTON_CLICKED]: { [EVENT_PARAM.CTA_BUTTON_CLICKED]: string };
  [EVENT_NAME.ENTITY_SELECTED]: { [EVENT_PARAM.ENTITY_NAME]: string };
  [EVENT_NAME.ENTITY_TABLE_PAGINATED]: {
    [EVENT_PARAM.ENTITY_NAME]: string;
    [EVENT_PARAM.PAGINATION_DIRECTION]: PAGINATION_DIRECTION;
  };
  [EVENT_NAME.ENTITY_TABLE_SORTED]: {
    [EVENT_PARAM.ENTITY_NAME]: string;
    [EVENT_PARAM.COLUMN_NAME]: string;
    [EVENT_PARAM.SORT_DIRECTION]: SORT_DIRECTION;
  };
  [EVENT_NAME.FILTER_SELECTED]: {
    [EVENT_PARAM.FILTER_NAME]: string;
    [EVENT_PARAM.FILTER_VALUE]: boolean;
  };
};

/**
 * Set of analytics pagination direction values.
 */
export enum PAGINATION_DIRECTION {
  NEXT = "NEXT",
  PREV = "PREV",
}

/**
 * Set of analytics sort direction values.
 */
export enum SORT_DIRECTION {
  ASC = "ASC",
  DESC = "DESC",
}
