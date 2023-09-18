import React from "react";
import { expireTimeInSeconds } from "../../../../../../../../providers/authentication";
import { Alert } from "../../../../../../../common/Alert/alert";
import { Link } from "../../../../../../../Links/components/Link/link";

export interface NIHAccountExpiryWarningProps {
  linkExpireTime?: number;
  linkWillExpire?: boolean;
}

export const NIHAccountExpiryWarning = ({
  linkExpireTime,
  linkWillExpire,
}: NIHAccountExpiryWarningProps): JSX.Element | null => {
  return linkExpireTime && linkWillExpire ? (
    <Alert
      severity="warning"
      title={
        <>
          Your NIH account link will expire in{" "}
          {getExpireTimeInDays(linkExpireTime)} days. Please{" "}
          <Link
            label="renew your account"
            url="https://support.terra.bio/hc/en-us/articles/360038086332-Linking-authorization-accessing-controlled-data-on-external-servers#heading-4"
          />{" "}
          link.
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
function getExpireTimeInDays(expireTime: number): number {
  return Math.ceil(expireTimeInSeconds(expireTime) / 60 / 60 / 24);
}
