import { ListItemText } from "@mui/material";
import React from "react";
import { Description, Label } from "./navMenuItemBody.styles";

export interface NavMenuItemProps {
  description?: string;
  label: string;
}

export const NavMenuItemBody = ({
  description,
  label,
}: NavMenuItemProps): JSX.Element => {
  if (description) {
    return (
      <ListItemText>
        <Label variant="text-body-500">{label}</Label>
        <Description variant="text-body-small-400-2lines">
          {description}
        </Description>
      </ListItemText>
    );
  } else {
    return (
      <ListItemText primaryTypographyProps={{ variant: "text-body-400" }}>
        {label}
      </ListItemText>
    );
  }
};
