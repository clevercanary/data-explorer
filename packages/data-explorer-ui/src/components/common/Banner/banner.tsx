import { Box } from "@mui/material";
import React, { ReactNode } from "react";

export interface BannerProps {
  children: ReactNode;
}

export const Banner = ({ children, ...props }: BannerProps): JSX.Element => {
  return <Box {...props}>{children}</Box>;
};
