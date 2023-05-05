import type { ButtonProps } from "@mui/material/Button/Button";
import React from "react";
import { StyledButtonBase } from "./textButton.styles";

export interface TextButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const TextButton = ({ children }: TextButtonProps): JSX.Element => {
  return <StyledButtonBase>{children}</StyledButtonBase>;
};
