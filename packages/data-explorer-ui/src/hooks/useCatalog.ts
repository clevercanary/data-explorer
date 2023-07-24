import { useConfig } from "./useConfig";

/**
 * Returns configured entity list and detail catalog values.
 * @returns entity list and detail catalog values.
 */
export const useCatalog = (): [string, string] => {
  const { config } = useConfig();
  const { dataSource } = config;
  const { defaultDetailParams, defaultListParams } = dataSource || {};
  const { catalog: detailCatalog } = defaultDetailParams || {};
  const { catalog: listCatalog } = defaultListParams || {};
  // Returns entity list and detail catalog configuration.
  return [listCatalog, detailCatalog];
};
