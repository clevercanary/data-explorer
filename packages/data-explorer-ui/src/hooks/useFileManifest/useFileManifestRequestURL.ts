import { useConfig } from "../useConfig";

/**
 * Returns file manifest URL for the integrations end point and given request params.
 * @param requestParams - Request params.
 * @returns file manifest URL.
 */
export const useFileManifestRequestURL = (
  requestParams?: URLSearchParams
): string | undefined => {
  const { config } = useConfig();
  const { dataSource } = config;
  const { url } = dataSource;

  if (!requestParams) {
    return;
  }

  // Build file manifest URL
  return `${url}fetch/manifest/files?${requestParams.toString()}`;
};
