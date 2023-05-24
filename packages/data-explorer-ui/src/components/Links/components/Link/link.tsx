import { Link as MLink, LinkProps as MLinkProps } from "@mui/material";
import NLink from "next/link";
import React, { ReactNode } from "react";
import { isValidUrl } from "../../../../common/utils";
import { CopyToClipboard } from "../../../common/CopyToClipboard/copyToClipboard";
import { ANCHOR_TARGET } from "../../common/entities";
import { isClientSideNavigation } from "../../common/utils";

export interface LinkProps {
  copyable?: boolean;
  label: ReactNode /* link label may be an element */;
  noWrap?: MLinkProps["noWrap"];
  target?: ANCHOR_TARGET;
  url: string;
}

export const Link = ({
  copyable = false,
  label,
  noWrap = false,
  target,
  url,
}: LinkProps): JSX.Element => {
  return (
    <>
      {isClientSideNavigation(url) ? (
        <>
          <NLink href={url} passHref>
            <MLink
              rel="noopener"
              noWrap={noWrap}
              target={target || ANCHOR_TARGET.SELF}
            >
              {label}
            </MLink>
          </NLink>
          {copyable && <CopyToClipboard copyStr={url} />}
        </>
      ) : isValidUrl(url) ? (
        <>
          <MLink
            href={url}
            rel="noopener"
            noWrap={noWrap}
            target={target || ANCHOR_TARGET.BLANK}
          >
            {label}
          </MLink>
          {copyable && <CopyToClipboard copyStr={url} />}
        </>
      ) : (
        label
      )}
    </>
  );
};
