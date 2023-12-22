import { RESPONSE_STATUS } from "./common/entities";
import { useAuthentication } from "./useAuthentication";

const WARNING_WINDOW_SECONDS = 60 * 60 * 24 * 5; // 5 days.

interface UseAuthenticationNIHExpiry {
  isReady: boolean;
  linkExpired?: boolean;
  linkExpireTime?: number;
  linkWillExpire?: boolean;
}

/**
 * Handles authentication NIH expiry.
 * @returns NIH expiry status.
 */
export const useAuthenticationNIHExpiry = (): UseAuthenticationNIHExpiry => {
  const authentication = useAuthentication();
  const { terraNIHProfileResponse } = authentication;
  const { response, status } = terraNIHProfileResponse;
  const { linkExpireTime } = response || {};
  const isReady = status === RESPONSE_STATUS.COMPLETED;
  const linkExpired = hasLinkedNIHAccountExpired(linkExpireTime);
  const linkWillExpire = isLinkedNIHAccountWillExpire(linkExpireTime);
  return {
    isReady,
    linkExpireTime,
    linkExpired,
    linkWillExpire,
  };
};

/**
 * Calculates the remaining time in seconds until the given expiration time.
 * @param expireTime - Expire time in seconds.
 * @returns remaining time in seconds.
 */
export function expireTimeInSeconds(expireTime: number): number {
  return expireTime - Date.now() / 1000;
}

/**
 * Returns true if the linked NIH account has expired.
 * @param expireTime - Expire time in seconds.
 * @returns true if the linked NIH account has expired.
 */
function hasLinkedNIHAccountExpired(expireTime?: number): boolean | undefined {
  if (!expireTime) return;
  return expireTimeInSeconds(expireTime) < 0;
}

/**
 * Returns true if the linked NIH account will expire in less than a week.
 * @param expireTime - Expire time in seconds.
 * @returns true if the linked NIH account will expire in less than a week.
 */
function isLinkedNIHAccountWillExpire(
  expireTime?: number
): boolean | undefined {
  if (!expireTime) return;
  return expireTimeInSeconds(expireTime) < WARNING_WINDOW_SECONDS;
}
