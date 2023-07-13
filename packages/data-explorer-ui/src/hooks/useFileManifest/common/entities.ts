import { FileTypeSummary } from "../../../apis/azul/common/entities";
import { CategoryKey, CategoryValueKey } from "../../../common/entities";

/**
 * Model of data returned from entity end points, including:
 * - the current set of selected facets, as well as facet terms and their corresponding counts.
 */
export interface EntitySearchResults {
  facets: FileFacet[];
}

export interface FetchFilesFacets {
  filesFacets: FileFacet[];
  isLoading: boolean;
}

export interface FetchFileSummary {
  fileSummary: FileSummary;
  isLoading: boolean;
}

/**
 * Model of a facet that contains a list of terms values.
 */
export interface FileFacet {
  name: string;
  selected: boolean; // true if any terms are selected
  selectedTermCount: number; // number of selected terms
  selectedTerms: Term[];
  termCount: number; // number of terms available
  terms: Term[];
  termsByName: TermsByName;
  total: number;
}

export interface FileManifest {
  filesFacets: FileFacet[];
  fileSummary: FileSummary;
}

/**
 * Model of counts, file sizes and other summary values of the current selection of facets.
 */
export interface FileSummary {
  donorCount: number;
  fileCount: number;
  fileTypeSummaries: Omit<FileTypeSummary, "format">[];
  organTypes: string[];
  projectCount: number;
  specimenCount: number;
  totalCellCount: number;
  totalFileSize: number;
}

export type SelectedSearchTermsBySearchKey = Map<
  CategoryKey,
  Set<CategoryValueKey>
>;

/**
 * Model of an individual facet value. For example, the term "Homo Sapiens" contained in the facet "Species".
 */
export interface Term {
  count: number;
  name: string;
  selected: boolean;
}

export type TermsByName = Map<string, Term>;
