import * as apiEntityService from "../api/service";
import * as apicfEntityService from "../apicf/service";
import * as entityService from "../common/service";
import * as tsvEntityService from "../tsv/service";
import { EntityService, EntityServiceType } from "./model";

const API_ENTITY_SERVICE: EntityService = {
  fetchAllEntities: apiEntityService.fetchAllEntities,
  fetchEntitiesFromQuery: apiEntityService.fetchEntitiesFromQuery,
  fetchEntitiesFromURL: entityService.fetchEntitiesFromURL,
  fetchEntityDetail: apiEntityService.fetchEntityDetail,
  fetchSummary: apiEntityService.fetchSummary,
};

const API_CF_ENTITY_SERVICE: EntityService = {
  fetchAllEntities: apicfEntityService.fetchAllEntities,
  fetchEntitiesFromQuery: apicfEntityService.fetchEntitiesFromQuery,
  fetchEntitiesFromURL: entityService.fetchEntitiesFromURL,
  fetchEntity: apicfEntityService.fetchEntity,
  fetchEntityDetail: apicfEntityService.fetchEntityDetail,
  fetchSummary: apicfEntityService.fetchSummary,
};

const TSV_ENTITY_SERVICE: EntityService = {
  fetchAllEntities: tsvEntityService.fetchAllEntities,
  fetchEntitiesFromQuery: tsvEntityService.fetchEntitiesFromQuery,
  fetchEntitiesFromURL: tsvEntityService.fetchEntitiesFromURL,
  fetchEntityDetail: tsvEntityService.fetchEntityDetail,
  fetchSummary: tsvEntityService.fetchSummary,
};

const ENTITY_SERVICES: { [key in EntityServiceType]: EntityService } = {
  API: API_ENTITY_SERVICE,
  API_CF: API_CF_ENTITY_SERVICE,
  TSV: TSV_ENTITY_SERVICE,
};

/**
 * Exports a function that can be used to create a Fetcher
 * @param type - The type of service to create, either an API_FETCHER or TSV_FETCHER
 * @returns Fetcher used to request entities, entity lists and summaries.
 */
export const createEntityService = (type: EntityServiceType): EntityService =>
  ENTITY_SERVICES[type];
