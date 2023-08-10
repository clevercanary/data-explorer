import { Chip as MChip, ChipProps as MChipProps } from "@mui/material";
import React from "react";

export enum STATUS_BADGE_COLOR {
  DEFAULT = "default",
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

export const StatusBadge = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- children is null for Mui ChipProps.
  children,
  color,
  label,
  ...props /* Spread props to allow for Mui ChipProps specific prop overrides e.g. "onDelete". */
}: MChipProps): JSX.Element => {
  return <MChip color={color} label={label} variant="status" {...props} />;
};
