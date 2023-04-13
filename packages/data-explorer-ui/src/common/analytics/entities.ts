// eslint-disable-next-line @typescript-eslint/no-explicit-any -- We can't determine the data layer type.
export type DataLayer = any;

/**
 * Set of analytics event actions.
 */
export enum EVENT_NAME {
  ENTITY_TABLE_PAGINATED = "entity_table_paginated",
  ENTITY_TABLE_SORTED = "entity_table_sorted",
}

/**
 * Set of analytics event parameters.
 */
export enum EVENT_PARAM {
  COLUMN_NAME = "column_name",
  ENTITY_NAME = "entity_name",
  PAGINATION_DIRECTION = "pagination_direction",
  SORT_DIRECTION = "sort_direction",
}

/**
 * Set of analytics pagination direction values.
 */
export enum PAGINATION_DIRECTION {
  NEXT = "next",
  PREV = "prev",
}

/**
 * Set of analytics sort direction values.
 */
export enum SORT_DIRECTION {
  ASC = "asc",
  DESC = "desc",
}

/**
 * Model of event parameters mapped to the event name.
 */
export type EventParams = {
  [EVENT_NAME.ENTITY_TABLE_PAGINATED]: {
    [EVENT_PARAM.ENTITY_NAME]: string;
    [EVENT_PARAM.PAGINATION_DIRECTION]: PAGINATION_DIRECTION;
  };
  [EVENT_NAME.ENTITY_TABLE_SORTED]: {
    [EVENT_PARAM.ENTITY_NAME]: string;
    [EVENT_PARAM.COLUMN_NAME]: string;
    [EVENT_PARAM.SORT_DIRECTION]: SORT_DIRECTION;
  };
};
