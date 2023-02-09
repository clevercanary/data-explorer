import { PaletteColorOptions, Theme as MTheme } from "@mui/material";
import "@mui/material/Button";
import "@mui/material/Checkbox";
import "@mui/material/Chip";
import "@mui/material/IconButton";
import "@mui/material/Paper";
import "@mui/material/styles";
import "@mui/material/styles/createPalette";
import { TypographyStyleOptions } from "@mui/material/styles/createTypography";
import "@mui/material/SvgIcon";
import "@mui/material/Typography";
import {
  TEXT_BODY_400,
  TEXT_BODY_400_2_LINES,
  TEXT_BODY_500,
  TEXT_BODY_500_2_LINES,
  TEXT_BODY_LARGE_400,
  TEXT_BODY_LARGE_400_2_LINES,
  TEXT_BODY_LARGE_500,
  TEXT_BODY_SMALL_400,
  TEXT_BODY_SMALL_500,
  TEXT_HEADING,
  TEXT_HEADING_LARGE,
  TEXT_HEADING_SMALL,
  TEXT_HEADING_XLARGE,
  TEXT_UPPERCASE_500,
} from "../../theme/common/typography";

/**
 * Breakpoint definitions.
 */
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    desktop: true;
    desktopSm: true;
    lg: false;
    md: false;
    mobile: true;
    sm: false;
    tablet: true;
    xl: false;
    xs: false;
  }
}

/**
 * Button prop options.
 */
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    nav: true;
  }
}

/**
 * Checkbox prop options.
 */
declare module "@mui/material/Checkbox" {
  interface CheckboxPropsSizeOverrides {
    xsmall: true;
  }
}

/**
 * Chip prop options.
 */
declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    default: true;
    info: true;
    warning: true;
  }

  interface ChipPropsVariantOverrides {
    filterTag: true;
    ntag: true;
    status: true;
  }
}

/**
 * IconButton prop options.
 */
declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    ink: true;
    inkLight: true;
  }

  interface IconButtonPropsSizeOverrides {
    xlarge: true;
    xsmall: true;
    xxsmall: true;
  }
}

/**
 * Palette definitions.
 */
declare module "@mui/material/styles/createPalette" {
  interface Palette {
    alert: PaletteColor;
    ink: PaletteColor;
    smoke: PaletteColor;
  }

  interface PaletteColor {
    lightest?: string;
  }

  interface PaletteOptions {
    alert?: PaletteColorOptions;
    ink?: PaletteColorOptions;
    smoke?: PaletteColorOptions;
  }

  interface SimplePaletteColorOptions {
    lightest?: string;
  }
}

/**
 * Paper prop options.
 */
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    footer: true;
    menu: true;
    panel: true;
    sidebar: true;
  }
}

/**
 * SvgIcon prop options.
 */
declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    inkLight: true;
  }

  interface SvgIconPropsSizeOverrides {
    xsmall: true;
    xxlarge: true;
    xxsmall: true;
  }
}

/**
 * Typography definitions.
 */
declare module "@mui/material/styles" {
  interface TypographyVariants {
    [TEXT_BODY_400]: TypographyStyleOptions;
    [TEXT_BODY_400_2_LINES]: TypographyStyleOptions;
    [TEXT_BODY_500]: TypographyStyleOptions;
    [TEXT_BODY_500_2_LINES]: TypographyStyleOptions;
    [TEXT_BODY_LARGE_400]: TypographyStyleOptions;
    [TEXT_BODY_LARGE_400_2_LINES]: TypographyStyleOptions;
    [TEXT_BODY_LARGE_500]: TypographyStyleOptions;
    [TEXT_BODY_SMALL_400]: TypographyStyleOptions;
    [TEXT_BODY_SMALL_500]: TypographyStyleOptions;
    [TEXT_HEADING]: TypographyStyleOptions;
    [TEXT_HEADING_LARGE]: TypographyStyleOptions;
    [TEXT_HEADING_SMALL]: TypographyStyleOptions;
    [TEXT_HEADING_XLARGE]: TypographyStyleOptions;
    [TEXT_UPPERCASE_500]: TypographyStyleOptions;
  }

  interface TypographyVariantsOptions {
    [TEXT_BODY_400]?: TypographyStyleOptions;
    [TEXT_BODY_400_2_LINES]?: TypographyStyleOptions;
    [TEXT_BODY_500]?: TypographyStyleOptions;
    [TEXT_BODY_500_2_LINES]?: TypographyStyleOptions;
    [TEXT_BODY_LARGE_400]?: TypographyStyleOptions;
    [TEXT_BODY_LARGE_400_2_LINES]?: TypographyStyleOptions;
    [TEXT_BODY_LARGE_500]?: TypographyStyleOptions;
    [TEXT_BODY_SMALL_400]?: TypographyStyleOptions;
    [TEXT_BODY_SMALL_500]?: TypographyStyleOptions;
    [TEXT_HEADING]?: TypographyStyleOptions;
    [TEXT_HEADING_LARGE]?: TypographyStyleOptions;
    [TEXT_HEADING_SMALL]?: TypographyStyleOptions;
    [TEXT_HEADING_XLARGE]?: TypographyStyleOptions;
    [TEXT_UPPERCASE_500]?: TypographyStyleOptions;
  }
}

/**
 * Typography variant overrides.
 */
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    [TEXT_BODY_400]: true;
    [TEXT_BODY_400_2_LINES]: true;
    [TEXT_BODY_500]: true;
    [TEXT_BODY_500_2_LINES]: true;
    [TEXT_BODY_LARGE_400]: true;
    [TEXT_BODY_LARGE_400_2_LINES]: true;
    [TEXT_BODY_LARGE_500]: true;
    [TEXT_BODY_SMALL_400]: true;
    [TEXT_BODY_SMALL_500]: true;
    [TEXT_HEADING]: true;
    [TEXT_HEADING_LARGE]: true;
    [TEXT_HEADING_SMALL]: true;
    [TEXT_HEADING_XLARGE]: true;
    [TEXT_UPPERCASE_500]: true;
  }
}

declare module "@emotion/react" {
  export interface Theme extends MTheme {
    name: "EmotionTheme";
  }
}
