import { CommonColors, PaletteColor } from "@mui/material/styles/createPalette";
import { ThemeProps } from "../../../theme/theme";

// Ink
export const inkLight = ({ theme }: ThemeProps): PaletteColor["light"] =>
  theme.palette.ink.light;
export const inkMain = ({ theme }: ThemeProps): PaletteColor["main"] =>
  theme.palette.ink.main;

// Smoke
export const smokeMain = ({ theme }: ThemeProps): PaletteColor["main"] =>
  theme.palette.smoke.main;

// Success
export const successMain = ({ theme }: ThemeProps): PaletteColor["main"] =>
  theme.palette.success.main;

// White
export const white = ({ theme }: ThemeProps): CommonColors["white"] =>
  theme.palette.common.white;
