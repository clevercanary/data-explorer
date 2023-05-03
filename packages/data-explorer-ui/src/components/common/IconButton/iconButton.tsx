import {
  IconButton as MIconButton,
  IconButtonProps as MIconButtonProps,
} from "@mui/material";
import React, { ElementType } from "react";

/**
 * Basic icon button component.
 * Use IconButtonSecondary styles to render secondary icon button.
 */

export interface IconButtonProps extends MIconButtonProps {
  Icon: ElementType;
}

export const IconButton = ({
  Icon,
  ...props /* Spread props to allow for Mui IconButtonProps specific prop overrides e.g. "onClick". */
}: IconButtonProps): JSX.Element => {
  return (
    <MIconButton size="large" {...props}>
      <Icon fontSize="small" />
    </MIconButton>
  );
};
