import Link from "next/link";
import React from "react";
import {
  ImageSrc,
  StaticImage,
} from "../../../../../../../common/StaticImage/staticImage";
import { ANCHOR_TARGET } from "../../../../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../../../../Links/common/utils";

export interface LogoProps {
  alt: string;
  height?: number;
  link: string;
  src: ImageSrc;
  target?: ANCHOR_TARGET;
  width?: number;
}

export const Logo = ({
  alt,
  height,
  link,
  src,
  target = ANCHOR_TARGET.SELF,
  width,
}: LogoProps): JSX.Element => {
  const logo = (
    <StaticImage alt={alt} height={height} src={src} width={width} />
  );
  return isClientSideNavigation(link) ? (
    <Link href={link} passHref>
      <a href="passHref" rel="noopener" target={target}>
        {logo}
      </a>
    </Link>
  ) : (
    <a href={link} rel="noopener" target={target}>
      {logo}
    </a>
  );
};
