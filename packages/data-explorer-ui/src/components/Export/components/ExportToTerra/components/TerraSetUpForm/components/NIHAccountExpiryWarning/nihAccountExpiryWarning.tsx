import React from "react";
import { expireTimeInSeconds } from "../../../../../../../../providers/authentication";
import { Alert } from "../../../../../../../common/Alert/alert";
import { Link } from "../../../../../../../Links/components/Link/link";

export interface NIHAccountExpiryWarningProps {
  linkExpired?: boolean;
  linkExpireTime?: number;
  linkWillExpire?: boolean;
}

export const NIHAccountExpiryWarning = ({
  linkExpired = false,
  linkExpireTime,
  linkWillExpire = false,
}: NIHAccountExpiryWarningProps): JSX.Element | null => {
  return linkWillExpire || linkExpired ? (
    <Alert
      severity="warning"
      title={
        <>
          <span>{getExpiryMessage(linkExpired, linkExpireTime)}</span>{" "}
          <span>
            Please{" "}
            <Link
              label="renew your account"
              url="https://support.terra.bio/hc/en-us/articles/360038086332-Linking-authorization-accessing-controlled-data-on-external-servers#heading-4"
            />{" "}
            link.
          </span>
        </>
      }
      variant="banner"
    />
  ) : null;
};

/**
 * Calculates the remaining days until the link expires.
 * @param expireTime - Link expiration time in seconds.
 * @returns remaining days until the link expires.
 */
function getExpireTimeInDays(expireTime?: number): number {
  if (!expireTime) {
    return 0;
  }
  return Math.max(Math.ceil(expireTimeInSeconds(expireTime) / 60 / 60 / 24), 0);
}

/**
 * Returns an expiration message indicating whether the provided link has already expired or is set to expire.
 * @param linkExpired - Link expired flag.
 * @param expireTime - Link expiration time in seconds.
 * @returns expiration message.
 */
function getExpiryMessage(linkExpired: boolean, expireTime?: number): string {
  if (linkExpired) {
    return "Your NIH account link has expired.";
  }
  return `Your NIH account link will expire in ${getExpireTimeInDays(
    expireTime
  )} days.`;
}
