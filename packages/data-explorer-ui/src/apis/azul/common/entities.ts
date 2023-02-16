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
 * Azul search index.
 */
export type AzulSearchIndex = keyof Pick<
  AzulListParams,
  "search_before" | "search_after"
>;
