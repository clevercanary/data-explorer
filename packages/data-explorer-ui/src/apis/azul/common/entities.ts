/**
 * Set of end point paths accepted by Azul.
 */
export enum APIEndpoints {
  "FILES" = "/files",
  "SUMMARY" = "/summary",
}

/**
 * Model of index (list) responses from Azul, such as projects (index/projects), samples (index/samples) and
 * files (index/files).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- this type can't be determined beforehand
export interface AzulEntitiesResponse<T = any> {
  hits: T[];
  pagination: AzulPaginationResponse;
  termFacets: AzulTermFacets;
}

/**
 * Model of statically-built response from hitting Azul index endpoint e.g. /index/projects. That is, the model
 * is built at build-time.
 */
export interface AzulEntitiesStaticResponse {
  data?: AzulEntitiesResponse;
  entityListType: string;
}

/**
 * Model of statically-built response from hitting Azul detail endpoint e.g. /index/projects/uuid. That is, the model
 * is built at build-time.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- this data type can't be determined beforehand
export interface AzulEntityStaticResponse<T = any> {
  data?: T;
}

/**
 * Set of filter operators accepted by Azul.
 */
export enum AZUL_FILTER_OPERATOR {
  "IS" = "is",
}

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
 * Base index response interface, implemented by specific index responses (e.g. projects, samples, files).
 */
export interface AzulPaginationResponse {
  count: number;
  next?: string;
  order?: "asc" | "desc";
  pages: number;
  previous?: string;
  size: number;
  sort?: string;
  total: number;
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
 * Model of response returned from /index/summary API endpoint.
 */
export interface AzulSummaryResponse {
  cellCountSummaries: {
    countOfDocsWithOrganType: number;
    organType: string[];
    totalCellCountByOrgan: number;
  }[];
  donorCount: number;
  fileCount: number;
  fileFormats?: FileFormatResponse[]; // TODO revisit AnVIL specific.
  fileTypeSummaries: FileTypeSummary[];
  labCount: number;
  organTypes: string[];
  projectCount: number;
  projects: {
    cellSuspensions?: {
      totalCells?: number;
    };
    projects: {
      estimatedCellCount: number;
    };
  }[];
  speciesCount: number;
  specimenCount: number;
  totalFileSize: number;
}

/**
 * Model of term returned from Azul entity endpoint (e.g. index/files).
 */
export interface AzulTerm {
  count: number;
  term: string;
}

/**
 * Model of term facet returned from Azul entity endpoint (e.g. index/files).
 */
export interface AzulTermFacet {
  terms: AzulTerm[];
  total: number;
  type: AZUL_TERM_TYPE;
}

/**
 * Model of term facets returned from Azul entity endpoint (e.g. index/files).
 */
export interface AzulTermFacets {
  [k: string]: AzulTermFacet;
}

/**
 * Set of possible term types retured from Azul.
 */
enum AZUL_TERM_TYPE {
  "TERMS" = "terms",
}

/**
 * Model of fileFormat value included in the response from index/summary API endpoint.
 */
export interface FileFormatResponse {
  count: number;
  format: string;
}

/**
 * Model of the response to get a download link, using a get-retry approach
 */
export interface FileLocationResponse {
  CommandLine: { [key: string]: string };
  Location: string;
  "Retry-After"?: number;
  Status: number;
}

/**
 * Model of file type summary.
 */
export interface FileTypeSummary {
  contentDescription: string[];
  count: number;
  format: string;
  isIntermediate: boolean | null;
  matrixCellCount: number | null;
  totalSize: number;
}

/**
 * Set of labels that values returned from Azul can be sanitized to.
 */
export enum LABEL {
  "EMPTY" = "", // TODO(cc) revisit - temp only? required for file download.
  "ERROR" = "Error",
  "NONE" = "None",
  "UNSPECIFIED" = "Unspecified",
}

/**
 * Manifest download format.
 */
export type ManifestDownloadFormat = MANIFEST_DOWNLOAD_FORMAT;

/**
 * Set of possible manifest download formats.
 */
export enum MANIFEST_DOWNLOAD_FORMAT {
  "COMPACT" = "compact",
  "CURL" = "curl",
  "FULL" = "full",
  "TERRA_BDBAG" = "terra.bdbag",
  "TERRA_PFB" = "terra.pfb",
}
