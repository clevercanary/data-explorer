import { getConfig } from "../config/config";

/**
 * Returns Google Tag Manager ID for the site.
 * @returns google tag manager id.
 */
export function getGTMId(): string | undefined {
  return getConfig().analytics?.gtmId;
}
