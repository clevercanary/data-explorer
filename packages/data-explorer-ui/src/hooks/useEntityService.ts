import { EntityConfig } from "../config/entities";
import { getEntityConfig } from "../config/utils";
import { createEntityService } from "../entity/service/factory";
import { EntityService } from "../entity/service/model";
import { useConfig } from "./useConfig";
import { useExploreState } from "./useExploreState";

interface FetcherResponse extends EntityService {
  detailStaticLoad: boolean;
  listStaticLoad: boolean;
  path: string;
}

export const getEntityService = (
  entityConfig: EntityConfig
): FetcherResponse => {
  if (entityConfig.apiPath) {
    return {
      ...createEntityService("API"),
      detailStaticLoad: !!entityConfig.detail.staticLoad,
      listStaticLoad: !!entityConfig.staticLoad,
      path: entityConfig.apiPath,
    };
  }

  if (entityConfig.staticLoad) {
    return {
      ...createEntityService("TSV"),
      detailStaticLoad: true,
      listStaticLoad: true,
      path: entityConfig.route, //the entity list type
    };
  }

  throw Error(
    `There's no data path for the entity ${entityConfig.label}. Define a tsvPath or an apiPath`
  );
};

/**
 * Hook to determine how the data should be loaded.
 * From API or from a tsv file.
 * @returns @see FetcherResponse
 */
export const useEntityService = (): FetcherResponse => {
  const { config } = useConfig();
  const { exploreState } = useExploreState();
  const entityConfig = getEntityConfig(
    config.entities,
    exploreState.tabValue // always use the current state's tab value.
  );
  return getEntityService(entityConfig);
};
