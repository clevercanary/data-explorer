/**
 * Set of valid params accepted by Azul's index (list) endpoints.
 */
export interface AzulListParams {
  filters?: string;
  order?: string;
  search_after?: string;
  search_before?: string;
  size?: string;
  sort?: string;
}

/**
 * Set of valid request params accepted by Azul.
 */
export enum AZUL_PARAM {
  "CATALOG" = "catalog",
  "FILTERS" = "filters",
}

/**
 * Azul search index.
 */
export type AzulSearchIndex = keyof Pick<
  AzulListParams,
  "search_before" | "search_after"
>;

/**
 * Set of export to Terra formats, use when requesting export to Terra location from Azul.
 */
export enum EXPORT_TO_TERRA_FORMAT {
  "BDBAG" = "terra.bdbag",
  "PFB" = "terra.pfb",
}

/**
 * Set of valid request params accepted by Azul when requesting an export to Terra location.
 */
export enum EXPORT_TO_TERRA_PARAM {
  "FORMAT" = "format",
}

/**
 * Model of the response to get a download link, using a get-retry approach
 */
export interface FileLocationResponse {
  Location: string;
  "Retry-After"?: number;
  Status: number;
}
