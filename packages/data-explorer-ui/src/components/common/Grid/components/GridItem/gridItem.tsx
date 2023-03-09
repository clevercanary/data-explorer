import { Box } from "@mui/material";
import React, { ReactNode } from "react";

export interface GridItemProps {
  children: ReactNode | ReactNode[];
}

/**
 * A basic Grid Item component for rendering CSS grid items.
 */

export const GridItem = ({
  children,
  ...props /* Spread props to allow for Mui Box specific prop overrides e.g. "sx" or system props. */
}: GridItemProps): JSX.Element => {
  return <Box {...props}>{children}</Box>;
};
