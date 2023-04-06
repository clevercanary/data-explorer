import { SxProps } from "@mui/material";
import React, { ReactNode } from "react";
import { KeyValueFn } from "../../keyValuePairs";
import { KeyValueElType as Box } from "./keyValueElType.styles";

/**
 * Basic KeyValuePairs "key value" component.
 * Facilitates handling of onClick on the KeyValue element in KeyValuePairs component.
 */

export interface KeyValueElTypeProps {
  boxSx?: SxProps;
  children: ReactNode;
  keyValueFn: KeyValueFn;
}

export const KeyValueElType = ({
  boxSx,
  children,
  keyValueFn,
  ...props /* Spread props to allow for Mui Box specific prop overrides. */
}: KeyValueElTypeProps): JSX.Element => {
  return (
    <Box onClick={keyValueFn} role="button" sx={boxSx} {...props}>
      {children}
    </Box>
  );
};
