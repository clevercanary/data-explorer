import { CommonColors, PaletteColor } from "@mui/material/styles/createPalette";
import { ThemeProps } from "../../../theme/theme";

export const inkLight = ({ theme }: ThemeProps): PaletteColor["light"] =>
  theme.palette.ink.light;

export const white = ({ theme }: ThemeProps): CommonColors["white"] =>
  theme.palette.common.white;
