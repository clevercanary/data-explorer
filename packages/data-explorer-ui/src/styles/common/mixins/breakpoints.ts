import { DESKTOP_SM, TABLET } from "../../../theme/common/breakpoints";
import { ThemeProps } from "../../../theme/theme";

export const mediaDesktopSmallUp = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up(DESKTOP_SM);

export const mediaTabletUp = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up(TABLET);
