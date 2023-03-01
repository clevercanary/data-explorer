import {
  Button as MButton,
  ButtonGroup as MButtonGroup,
  ButtonGroupProps as MButtonGroupProps,
} from "@mui/material";
import React, { ReactNode } from "react";
import { LoadingIcon } from "../CustomIcon/components/LoadingIcon/loadingIcon";

/**
 * An extension of the basic Mui ButtonGroup component with available ButtonGroup props.
 */

export type OnButtonGroupButtonFn = () => void; // Function invoked with button onClick handler.

export interface ButtonGroup {
  action: string; // Short description to describe button action.
  label: ReactNode; // Button label may be a string or an element e.g. icon.
  loading?: boolean;
  onClick: OnButtonGroupButtonFn;
}

export interface ButtonGroupProps {
  buttons: ButtonGroup[];
  color?: MButtonGroupProps["color"];
  disabled?: boolean;
  fullWidth?: boolean;
  orientation?: MButtonGroupProps["orientation"];
  size?: MButtonGroupProps["size"];
  variant?: MButtonGroupProps["variant"];
}

export const ButtonGroup = ({
  buttons,
  color = "primary",
  disabled = false,
  fullWidth = false,
  orientation = "horizontal",
  size = "small",
  variant = "contained",
}: ButtonGroupProps): JSX.Element => {
  return (
    <MButtonGroup
      color={color}
      disabled={disabled}
      fullWidth={fullWidth}
      orientation={orientation}
      size={size}
      variant={variant}
    >
      {buttons.map(({ action, label, loading, onClick }) => {
        return (
          <MButton key={action} onClick={loading ? undefined : onClick}>
            {loading ? <LoadingIcon fontSize="small" /> : label}
          </MButton>
        );
      })}
    </MButtonGroup>
  );
};
