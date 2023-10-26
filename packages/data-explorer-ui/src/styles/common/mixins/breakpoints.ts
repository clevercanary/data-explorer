import { DESKTOP_SM, TABLET } from "../../../theme/common/breakpoints";
import { ThemeProps } from "../../../theme/theme";

export const mediaDesktopSmallDown = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down(DESKTOP_SM);

export const mediaDesktopSmallUp = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up(DESKTOP_SM);

export const mediaTabletDown = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down(TABLET);

export const mediaTabletUp = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up(TABLET);
