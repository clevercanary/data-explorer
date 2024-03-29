import NextHead from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useConfig } from "../../hooks/useConfig";

const FAV_ICONS = {
  "16x16": "/favicons/favicon-16x16.png",
  "180x180": "/favicons/apple-touch-icon.png",
  "32x32": "/favicons/favicon-32x32.png",
  default: "/favicons/favicon.ico",
  maskIcon: "/favicons/safari-pinned-tab.svg",
  siteWebManifest: "/favicons/site.webmanifest",
};

export interface HeadProps {
  pageTitle?: string;
}

export const Head = ({ pageTitle }: HeadProps): JSX.Element => {
  const { config } = useConfig();
  const router = useRouter();
  const { appTitle } = config;
  const title = pageTitle ? `${pageTitle} - ${appTitle}` : appTitle;

  const renderIcons = (): JSX.Element => {
    return (
      <>
        <link
          rel="icon"
          type="image/x-icon"
          href={`${router.basePath}${FAV_ICONS.default}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}${FAV_ICONS["16x16"]}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}${FAV_ICONS["32x32"]}`}
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href={`${router.basePath}${FAV_ICONS["180x180"]}`}
        />
        <link
          rel="mask-icon"
          href={`${router.basePath}${FAV_ICONS.maskIcon}`}
        />
        <link
          rel="manifest"
          href={`${router.basePath}${FAV_ICONS.siteWebManifest}`}
        />
      </>
    );
  };

  return (
    <NextHead key="page-head">
      <title>{title}</title>
      {renderIcons()}
    </NextHead>
  );
};
