import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { Shadows } from "@mui/material/styles/shadows";
import * as B from "./common/breakpoints";
import * as C from "./common/components";
import * as P from "./common/palette";
import { shadows } from "./common/shadows";
import * as T from "./common/typography";

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
          lg: B.desktop,
          md: B.desktopSm,
          sm: B.tablet,
          xs: B.mobile,
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
        MuiButtonGroup: C.MuiButtonGroup,
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
        [T.TEXT_BODY_400]: T.textBody400,
        [T.TEXT_BODY_400_2_LINES]: T.textBody4002Lines,
        [T.TEXT_BODY_500]: T.textBody500,
        [T.TEXT_BODY_500_2_LINES]: T.textBody5002Lines,
        [T.TEXT_BODY_LARGE_400]: T.textBodyLarge400,
        [T.TEXT_BODY_LARGE_400_2_LINES]: T.textBodyLarge4002Lines,
        [T.TEXT_BODY_LARGE_500]: T.textBodyLarge500,
        [T.TEXT_BODY_SMALL_400]: T.textBodySmall400,
        [T.TEXT_BODY_SMALL_500]: T.textBodySmall500,
        [T.TEXT_HEADING]: T.textHeading,
        [T.TEXT_HEADING_LARGE]: T.textHeadingLarge,
        [T.TEXT_HEADING_SMALL]: T.textHeadingSmall,
        [T.TEXT_HEADING_XLARGE]: T.textHeadingXLarge,
        [T.TEXT_UPPERCASE_500]: T.textUppercase500,
        fontFamily: T.fontFamily,
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
