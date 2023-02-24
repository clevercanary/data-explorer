import {
  Button as MButton,
  ButtonGroup as MButtonGroup,
  ButtonGroupProps as MButtonGroupProps,
} from "@mui/material";
import React, { ElementType, ReactNode } from "react";

/**
 * An extension of the basic Mui ButtonGroup component with available ButtonGroup props.
 */

export type OnButtonGroupButtonFn = () => void; // Function invoked with button onClick handler.

export interface ButtonGroup {
  action: string; // Short description to describe button action.
  label: ElementType | string; // Button label may be an element i.e. icon.
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
      {buttons.map(({ action, label, onClick }) => {
        return (
          <MButton key={action} onClick={onClick}>
            {renderButtonLabel(label)}
          </MButton>
        );
      })}
    </MButtonGroup>
  );
};

/**
 * Renders button label.
 * @param label - Label is a string or element type.
 * @returns react node for the displaying of button label.
 */
function renderButtonLabel(label: ElementType | string): ReactNode {
  if (typeof label === "string") {
    return label;
  }
  const Label = label;
  return <Label />;
}
