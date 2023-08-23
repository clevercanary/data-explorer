import { TABLET } from "../../../theme/common/breakpoints";
import { ThemeProps } from "../../../theme/theme";

export const mediaTabletUp = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up(TABLET);
