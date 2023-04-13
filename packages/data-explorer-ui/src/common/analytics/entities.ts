// eslint-disable-next-line @typescript-eslint/no-explicit-any -- We can't determine the data layer type.
export type DataLayer = any;

/**
 * Set of analytics event actions.
 */
export enum EVENT_NAME {
  ENTITY_NAME = "entity_name",
  ENTITY_TABLE_SORTED = "entity_table_sorted",
}

/**
 * Set of analytics event parameters.
 */
export enum EVENT_PARAM {
  COLUMN_NAME = "column_name",
  ENTITY_NAME = "entity_name",
  SORT_DIRECTION = "sort_direction",
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO.
export type EventParams = any;
