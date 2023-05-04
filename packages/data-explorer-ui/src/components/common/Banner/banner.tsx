import React, { ReactNode } from "react";
import { Banner as Alert } from "./banner.styles";

export interface BannerProps {
  children: ReactNode;
}

export const Banner = ({ children }: BannerProps): JSX.Element => {
  return <Alert>{children}</Alert>;
};
