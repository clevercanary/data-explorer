import { BackPageConfig } from "../config/entities";
import { useConfig } from "./useConfig";

/**
 * Hook to get the export config
 * @returns @see BackPageConfig used on the export field for the current config.
 */
export const useExportConfig = (): BackPageConfig => {
  const { config } = useConfig();

  if (!config.export) {
    throw new Error(`This config does not have an export field set`);
  }

  return config.export;
};
