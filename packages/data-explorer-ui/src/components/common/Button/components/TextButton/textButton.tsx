import type { ButtonProps } from "@mui/material/Button/Button";
import React, { ReactNode } from "react";
import { StyledButtonBase } from "./textButton.styles";

export interface TextButtonProps extends ButtonProps {
  children: ReactNode;
}

export const TextButton = ({ children }: TextButtonProps): JSX.Element => {
  return <StyledButtonBase>{children}</StyledButtonBase>;
};
