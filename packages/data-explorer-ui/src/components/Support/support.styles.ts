import { css } from "@emotion/react";
import { ThemeProps } from "../../theme/theme";

export const fab = ({ theme }: ThemeProps) => css`
  align-items: center;
  background-color: ${theme.palette.primary.main};
  border: none;
  border-radius: 50%;
  bottom: 16px;
  box-shadow: ${theme.shadows[2]};
  color: ${theme.palette.common.white};
  cursor: pointer;
  display: flex;
  font-size: 28px; // Determines the size of the support icon.
  height: 56px;
  justify-content: center;
  position: fixed;
  right: 16px;
  width: 56px;
  z-index: 100; // Above loading component.
`;
