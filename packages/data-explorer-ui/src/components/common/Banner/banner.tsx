import React, { ReactNode } from "react";
import { Banner as Alert } from "./banner.styles";

export interface BannerProps {
  children: ReactNode;
  className?: string;
}

export const Banner = ({ children, className }: BannerProps): JSX.Element => {
  return <Alert className={className}>{children}</Alert>;
};
