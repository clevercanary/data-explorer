import { useConfig } from "./useConfig";

/**
 * Returns configured catalog value.
 * @returns catalog value.
 */
export const useCatalog = (): string | undefined => {
  const { config } = useConfig();
  const { dataSource } = config;
  const { defaultParams } = dataSource || {};
  const { catalog } = defaultParams || {};
  return catalog;
};
