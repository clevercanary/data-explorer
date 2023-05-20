import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { AzulEntitiesStaticResponse } from "../apis/azul/common/entities";
import { getConfig } from "../config/config";
import { EntityConfig } from "../config/entities";
import { getEntityConfig } from "../config/utils";
import { EMPTY_PAGE } from "../entity/api/constants";
import { getEntityService } from "../hooks/useEntityService";
import { database } from "../utils/database";
import { readFile } from "../utils/tsvParser";

interface PageUrl extends ParsedUrlQuery {
  entityListType: string;
}

/**
 * Seed database.
 * @param entityListType - Entity list type.
 * @param entityConfig - Entity config.
 */
const seedDatabase = async function seedDatabase( // TODO get rid of this duplicated code
  entityListType: string,
  entityConfig: EntityConfig
): Promise<void> {
  const { label, staticEntityImportMapper, staticLoadFile } = entityConfig;

  if (!staticLoadFile) {
    throw new Error(`staticLoadFile not found for entity entity ${label}`);
  }

  // Build database from configured TSV, if any.
  const rawData = await readFile(staticLoadFile);

  if (!rawData) {
    throw new Error(`File ${staticLoadFile} not found for entity ${label}`);
  }

  const object = JSON.parse(rawData.toString());
  const entities = staticEntityImportMapper
    ? Object.values(object).map(staticEntityImportMapper)
    : Object.values(object);

  // Seed entities.
  database.get().seed(entityListType, entities);
};

/**
 * Build the list of paths to be built statically.
 * @returns GetStaticPaths function to be used at the nextjs page
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const entities = getConfig().entities;
  const paths = entities.map((entity) => ({
    params: {
      entityListType: entity.route,
    },
  }));
  return {
    fallback: true, //TODO should this not be false? We have no server...
    paths,
  };
};

/**
 * Build the set of props for pre-rendering of page.
 * @param context - Object containing values related to the current context.
 */
export const getStaticProps: GetStaticProps<
  AzulEntitiesStaticResponse
> = async (context: GetStaticPropsContext) => {
  const appConfig = getConfig();
  const { entityListType } = context.params as PageUrl;
  const { entities } = appConfig;
  const entityConfig = getEntityConfig(entities, entityListType);
  const { staticLoad } = entityConfig;
  const { fetchAllEntities } = getEntityService(entityConfig); // Determine the type of fetch, either from an API endpoint or a TSV.

  // Seed database.
  if (entityConfig && staticLoad) {
    await seedDatabase(entityListType, entityConfig);
  }

  // Fetch the result set from either a configured API endpoint or from a local database seeded from a configured TSV.
  const resultList = entityConfig.staticLoad
    ? await fetchAllEntities(entityListType)
    : EMPTY_PAGE;

  return {
    props: {
      data: resultList,
      entityListType: entityListType,
    },
  };
};
