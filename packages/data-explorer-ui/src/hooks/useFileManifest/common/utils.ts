import {
  AzulEntitiesResponse,
  AzulSummaryResponse,
  AzulTerm,
  AzulTermFacet,
  AzulTermFacets,
  LABEL,
} from "../../../apis/azul/common/entities";
import { Filters } from "../../../common/entities";
import { DEFAULT_FILE_MANIFEST } from "./constants";
import {
  EntitySearchResults,
  FileFacet,
  FileSummary,
  SelectedSearchTermsBySearchKey,
  Term,
  TermsByName,
} from "./entities";

/**
 * Parse the entity API response and build up entity search results.
 * @param entityResponse - Response model return from the given entity API.
 * @param filters - Selected filters.
 * @returns entity search results.
 */
export function bindEntitySearchResultsResponse(
  entityResponse: AzulEntitiesResponse | undefined,
  filters: Filters
): EntitySearchResults {
  // Grab the search terms by search key
  const searchTermsBySearchKey = getSelectedSearchTermsBySearchKey(filters);
  // Build up term facets
  const facets = bindFacets(searchTermsBySearchKey, entityResponse?.termFacets);
  return {
    facets,
  };
}

/**
 * Map files API response into FileFacet objects, maintaining selected state of terms. This is specifically for
 * facets returned from the backend (which are facets with a corresponding list of terms) and not other types of
 * facets, for example, facets with a selected range.
 * TODO age range facet to be added, if required.
 * @param searchTermsBySearchKey - Selected search terms by search key.
 * @param responseFacetsByName - Facets returned from the API response.
 * @returns file facets.
 */
function bindFacets(
  searchTermsBySearchKey: SelectedSearchTermsBySearchKey,
  responseFacetsByName: AzulTermFacets | undefined
): FileFacet[] {
  if (!responseFacetsByName) {
    return DEFAULT_FILE_MANIFEST.filesFacets;
  }
  return Object.keys(responseFacetsByName).map((facetName) => {
    return buildFileFacet(
      facetName,
      searchTermsBySearchKey,
      responseFacetsByName[facetName]
    );
  });
}

/**
 * Create a set of terms from the terms returned in the response. Maintain selected state of terms from current set
 * of search terms.
 * @param facetName - Facet name.
 * @param responseTerms - Response terms.
 * @param searchTermNames - Selected search term names.
 * @returns response terms with selected state.
 */
function bindFacetTerms(
  facetName: string,
  responseTerms: AzulTerm[],
  searchTermNames: string[]
): Term[] {
  return responseTerms.reduce((accum: Term[], responseTerm) => {
    // Default term name to "Unspecified" if term name is null.
    const name = bindTermName(responseTerm);
    // Determine if term is currently selected as a search term.
    const selected = searchTermNames.indexOf(name) >= 0;
    // Create new term - default name to "Unspecified" if no value is returned.
    accum.push({ count: responseTerm.count, name, selected });
    return accum;
  }, []);
}

/**
 * Create a new file summary object (to trigger change detecting) from the file summary response, and fix erroneous
 * total file size count if applicable.
 * @param fileSummaryResponse - File summary response.
 * @returns file summary.
 */
export function bindFileSummaryResponse(
  fileSummaryResponse?: AzulSummaryResponse
): FileSummary {
  if (!fileSummaryResponse) {
    return DEFAULT_FILE_MANIFEST.fileSummary;
  }
  const totalFileSize =
    typeof fileSummaryResponse.totalFileSize === "string"
      ? 0
      : fileSummaryResponse.totalFileSize;
  // Calculate total cell count (as per Azul 3521).
  const totalCellCount = calculateSummaryTotalCellCount(fileSummaryResponse);
  return {
    donorCount: fileSummaryResponse.donorCount,
    fileCount: fileSummaryResponse.fileCount,
    fileTypeSummaries: fileSummaryResponse.fileTypeSummaries.map(
      (fileTypeSummaryResponse) => {
        return {
          contentDescription: fileTypeSummaryResponse.contentDescription,
          count: fileTypeSummaryResponse.count,
          fileType: fileTypeSummaryResponse.format,
          isIntermediate: fileTypeSummaryResponse.isIntermediate,
          matrixCellCount: fileTypeSummaryResponse.matrixCellCount,
          totalSize: fileTypeSummaryResponse.totalSize,
        };
      }
    ),
    organTypes: fileSummaryResponse.organTypes,
    projectCount: fileSummaryResponse.projectCount,
    specimenCount: fileSummaryResponse.specimenCount,
    totalCellCount,
    totalFileSize: totalFileSize,
  };
}

/**
 * Update term name returned from response, if null. Otherwise, return term name as is.
 * @param termResponse - Term response.
 * @returns term name, or "Unspecified" if term name is null.
 */
function bindTermName(termResponse: AzulTerm): string {
  return termResponse.term === null ? LABEL.UNSPECIFIED : termResponse.term;
}

/**
 * Build up file facet from response facet values, matching with current selected state of terms.
 * @param facetName - Facet name.
 * @param searchTermsBySearchKey - Selected search terms by search key.
 * @param responseFacet - Response facet of the given facet name.
 * @returns something.
 */
function buildFileFacet(
  facetName: string,
  searchTermsBySearchKey: SelectedSearchTermsBySearchKey,
  responseFacet: AzulTermFacet
): FileFacet {
  // Determine the set of currently selected search term names for this facet.
  const searchTermNames = listFacetSearchTermNames(
    facetName,
    searchTermsBySearchKey
  );
  // Build up the list of terms from the facet response.
  const responseTerms = bindFacetTerms(
    facetName,
    responseFacet.terms,
    searchTermNames
  );
  // Create facet from newly built terms and newly calculated total.
  return getFileFacet(facetName, responseFacet.total || 0, responseTerms);
}

/**
 * Calculate the summary total cell count using the projects and estimatedCellCount values returned in the response.
 * @param fileSummaryResponse - File summary response.
 * @returns summary total cell count.
 */
function calculateSummaryTotalCellCount(
  fileSummaryResponse: AzulSummaryResponse
): number {
  return (fileSummaryResponse.projects ?? []).reduce(
    (accum, { cellSuspensions, projects }) => {
      if (
        projects &&
        (projects.estimatedCellCount || projects.estimatedCellCount === 0)
      ) {
        accum += projects.estimatedCellCount;
      } else if (
        cellSuspensions &&
        (cellSuspensions.totalCells || cellSuspensions.totalCells === 0)
      ) {
        accum += cellSuspensions.totalCells;
      }
      return accum;
    },
    0
  );
}

/**
 * Returns file facet that contains a list of terms values from given facet name, total, and terms.
 * @param name - Facet name.
 * @param total - Total number of terms.
 * @param terms - List of terms.
 * @returns file facet.
 */
export function getFileFacet(
  name: string,
  total: number,
  terms: Term[]
): FileFacet {
  const selectedTerms = terms.filter(({ selected }) => selected);
  const selected = selectedTerms.length > 0;
  const termsByName: TermsByName = terms.reduce((acc, term) => {
    return acc.set(term.name, term);
  }, new Map());
  const termCount = terms.length;
  const selectedTermCount = selectedTerms.length;
  return {
    name,
    selected,
    selectedTermCount,
    selectedTerms,
    termCount,
    terms,
    termsByName,
    total,
  };
}

/**
 * Returns map of selected search terms by search key.
 * @param filters - Selected filters.
 * @returns map of selected search terms by search key.
 */
export function getSelectedSearchTermsBySearchKey(
  filters: Filters
): SelectedSearchTermsBySearchKey {
  const selectedSearchTermsBySearchKey: SelectedSearchTermsBySearchKey =
    new Map();
  for (const { categoryKey, value } of filters) {
    selectedSearchTermsBySearchKey.set(categoryKey, new Set(value));
  }
  return selectedSearchTermsBySearchKey;
}

/**
 * Returns the selected search terms for the specified facet, if any.
 * @param {string} facetName - Facet name.
 * @param searchTermsBySearchKey - Selected search terms by search key.
 * @returns selected search terms.
 */
function listFacetSearchTermNames(
  facetName: string,
  searchTermsBySearchKey: SelectedSearchTermsBySearchKey
): string[] {
  return [...(searchTermsBySearchKey.get(facetName) ?? [])];
}
