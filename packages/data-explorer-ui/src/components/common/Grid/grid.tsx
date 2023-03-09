import { Box } from "@mui/material";
import React, { ReactNode } from "react";

export interface GridProps {
  children: ReactNode | ReactNode[];
}

/**
 * A basic Grid component for rendering CSS grid.
 */

export const Grid = ({
  children,
  ...props /* Spread props to allow for Mui Box specific prop overrides e.g. "sx" or system props. */
}: GridProps): JSX.Element => {
  return (
    <Box display="grid" {...props}>
      {children}
    </Box>
  );
};
