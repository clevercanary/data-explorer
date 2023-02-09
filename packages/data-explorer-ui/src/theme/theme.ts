import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { Shadows } from "@mui/material/styles/shadows";
import "../common/types/theme";
import * as B from "./common/breakpoints";
import * as C from "./common/components";
import * as P from "./common/palette";
import { shadows } from "./common/shadows";
import { fontFamily, typography } from "./common/typography";

/**
 * Returns a generated theme with customization.
 * @param customOptions - Custom theme option overrides.
 * @returns theme with custom theme overrides.
 */
export function createAppTheme(customOptions?: ThemeOptions): Theme {
  // Generate default theme with custom overrides.
  const theme = createTheme(
    {
      breakpoints: {
        values: {
          desktop: B.desktop,
          desktopSm: B.desktopSm,
          mobile: B.mobile,
          tablet: B.tablet,
        },
      },
      components: {
        MuiAlert: C.MuiAlert,
        MuiAlertTitle: C.MuiAlertTitle,
        MuiAppBar: C.MuiAppBar,
        MuiBackdrop: C.MuiBackdrop,
        MuiBreadcrumbs: C.MuiBreadcrumbs,
        MuiButton: C.MuiButton,
        MuiButtonBase: C.MuiButtonBase,
        MuiCheckbox: C.MuiCheckbox,
        MuiChip: C.MuiChip,
        MuiCssBaseline: C.MuiCssBaseline,
        MuiDivider: C.MuiDivider,
        MuiDrawer: C.MuiDrawer,
        MuiIconButton: C.MuiIconButton,
        MuiInputBase: C.MuiInputBase,
        MuiLink: C.MuiLink,
        MuiListItemButton: C.MuiListItemButton,
        MuiListItemText: C.MuiListItemText,
        MuiMenuItem: C.MuiMenuItem,
        MuiOutlinedInput: C.MuiOutlinedInput,
        MuiPaper: C.MuiPaper,
        MuiSvgIcon: C.MuiSvgIcon,
        MuiTab: C.MuiTab,
        MuiTableCell: C.MuiTableCell,
        MuiTableSortLabel: C.MuiTableSortLabel,
        MuiTabs: C.MuiTabs,
        MuiToggleButton: C.MuiToggleButton,
        MuiToggleButtonGroup: C.MuiToggleButtonGroup,
        MuiToolbar: C.MuiToolbar,
        MuiTooltip: C.MuiTooltip,
        MuiTypography: C.MuiTypography,
      },
      palette: {
        alert: P.alert,
        background: P.background,
        info: P.info,
        ink: P.ink,
        primary: P.primary,
        smoke: P.smoke,
        success: P.success,
        text: P.text,
        warning: P.warning,
      },
      spacing: 4,
      typography: {
        fontFamily: fontFamily,
        ...typography,
      },
    },
    { ...customOptions }
  );

  // Default shadow overrides
  theme.shadows = [...theme.shadows].map(
    (shadow, s) => shadows[s] || shadow
  ) as Shadows;

  return theme;
}

/**
 * Default theme without customization.
 */
export const defaultTheme: Theme = createAppTheme();
