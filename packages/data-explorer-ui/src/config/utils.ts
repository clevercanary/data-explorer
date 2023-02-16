import { ColumnSort } from "@tanstack/react-table";
import { EntityConfig, SiteConfig } from "./entities";

/**
 * Returns context default config for config provider.
 * @returns context default config for config provider.
 */
export function getDefaultConfig(): SiteConfig {
  return {
    browserURL: "",
    dataSource: {
      url: "",
    },
    entities: [],
    explorerTitle: "",
    layout: {
      footer: {
        logos: [],
        navLinks: [],
        socials: [],
      },
      header: {
        logo: {
          alt: "",
          link: "",
          src: undefined,
        },
        navLinks: [],
        socials: [],
      },
    },
    redirectRootToPath: "",
  };
}

/**
 * Returns context default entity config for config provider.
 * @returns context default entity config for config provider.
 */
export function getDefaultEntityConfig(): EntityConfig {
  return {
    detail: {
      detailOverviews: [],
      staticLoad: false,
      tabs: [],
      top: [],
    },
    label: "",
    list: {
      columns: [],
    },
    route: "",
    staticLoad: false,
  };
}

/**
 * Returns the initial table sorting state for the specified entity list configuration.
 * @param entityConfig - Entity configuration.
 * @returns initial sorting state.
 */
export function getDefaultSorting(entityConfig: EntityConfig): ColumnSort[] {
  const columnSort = entityConfig.list.defaultSort;
  if (!columnSort) {
    return [];
  }
  return [columnSort];
}

/**
 * Returns the entity config for the given entity list type.
 * @param config - Site config.
 * @param entityListType - Entity list type.
 * @returns the entity config for the given entity list type.
 */
export function getEntityConfig(
  config: SiteConfig,
  entityListType: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
): EntityConfig {
  const entityConfig = config.entities.find(
    ({ route }) => route === entityListType
  );
  if (!entityConfig) {
    throw Error("No entity config found with name: " + entityListType);
  }
  return entityConfig;
}
