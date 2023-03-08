import { Components, Theme } from "@mui/material";
import { ErrorIcon } from "../../components/common/CustomIcon/components/ErrorIcon/errorIcon";
import { InfoIcon } from "../../components/common/CustomIcon/components/InfoIcon/infoIcon";
import { SuccessIcon } from "../../components/common/CustomIcon/components/SuccessIcon/successIcon";
import { WarningIcon } from "../../components/common/CustomIcon/components/WarningIcon/warningIcon";
import { desktopSmUp, desktopUp, mobileUp, tabletUp } from "./breakpoints";
import {
  alertLightest,
  alertMain,
  alertMain32,
  black04,
  infoLight,
  infoLightest,
  infoMain,
  infoMain32,
  inkLight,
  inkMain,
  inkMain60,
  inkMain80,
  primaryDark,
  primaryMain,
  smokeDark,
  smokeLight,
  smokeLightest,
  smokeMain,
  successLightest,
  successMain,
  successMain32,
  warningLight,
  warningLightest,
  warningMain,
  warningMain32,
  white,
} from "./palette";
import {
  elevation01,
  elevation02,
  strokeBottomSmoke,
  strokeTopSmoke,
} from "./shadows";
import {
  fontFamily,
  textBody400,
  textBody4002Lines,
  textBody500,
  textBodyLarge500,
  textBodySmall400,
  textBodySmall500,
  TEXT_HEADING,
} from "./typography";

// Constants
const FLEX_START = "flex-start";

/**
 * MuiAlert Component
 */
export const MuiAlert: Components["MuiAlert"] = {
  defaultProps: {
    iconMapping: {
      error: ErrorIcon({ fontSize: "small" }),
      info: InfoIcon({ fontSize: "small" }),
      success: SuccessIcon({ fontSize: "small" }),
      warning: WarningIcon({ fontSize: "small" }),
    },
  },
  styleOverrides: {
    icon: {
      opacity: 1,
      padding: "2px 0",
    },
    message: {
      padding: 0,
    },
    root: {
      ...textBody4002Lines,
      borderRadius: 8,
      boxShadow: elevation01,
      color: inkMain,
    },
    standard: {
      alignItems: FLEX_START,
      padding: 20,
    },
    standardError: {
      backgroundColor: alertLightest,
      border: `1px solid ${alertMain32}`,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "& .MuiAlert-icon": {
        color: alertMain,
      },
    },
    standardInfo: {
      backgroundColor: infoLightest,
      border: `1px solid ${infoMain32}`,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "& .MuiAlert-icon": {
        color: infoMain,
      },
    },
    standardSuccess: {
      backgroundColor: successLightest,
      border: `1px solid ${successMain32}`,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "& .MuiAlert-icon": {
        color: successMain,
      },
    },
    standardWarning: {
      backgroundColor: warningLightest,
      border: `1px solid ${warningMain32}`,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "& .MuiAlert-icon": {
        color: warningMain,
      },
    },
  },
  variants: [
    {
      props: { severity: "info", variant: "neutral" },
      style: {
        backgroundColor: smokeLight,
        padding: 16,
      },
    },
    {
      props: { variant: "banner" },
      style: {
        padding: 16,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiAlert-icon": {
          padding: 0,
        },
        "& .MuiAlertTitle-root": {
          ...textBody500,
        },
      },
    },
    {
      props: { severity: "error", variant: "banner" },
      style: {
        backgroundColor: alertLightest,
        border: `1px solid ${alertMain32}`,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiAlert-icon": {
          color: alertMain,
        },
      },
    },
    {
      props: { severity: "info", variant: "banner" },
      style: {
        backgroundColor: infoLightest,
        border: `1px solid ${infoMain32}`,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiAlert-icon": {
          color: infoMain,
        },
      },
    },
    {
      props: { severity: "success", variant: "banner" },
      style: {
        backgroundColor: successLightest,
        border: `1px solid ${successMain32}`,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiAlert-icon": {
          color: successMain,
        },
      },
    },
    {
      props: { severity: "warning", variant: "banner" },
      style: {
        backgroundColor: warningLightest,
        border: `1px solid ${warningMain32}`,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiAlert-icon": {
          color: warningMain,
        },
      },
    },
  ],
};

/**
 * MuiAlertTitle Component
 */
export const MuiAlertTitle: Components["MuiAlertTitle"] = {
  styleOverrides: {
    root: {
      ...textBodyLarge500,
      margin: 0,
    },
  },
};

/**
 * MuiAppBar Component
 */
export const MuiAppBar: Components["MuiAppBar"] = {
  defaultProps: {
    color: "default",
    elevation: 0,
    position: "static",
  },
  styleOverrides: {
    colorDefault: {
      backgroundColor: white,
    },
  },
};

/**
 * MuiBackdrop Component
 */
export const MuiBackdrop: Components["MuiBackdrop"] = {
  styleOverrides: {
    invisible: {
      backgroundColor: "transparent",
    },
    root: {
      backgroundColor: inkMain80,
    },
  },
};

/**
 * MuiBreadcrumbs Component
 */
export const MuiBreadcrumbs: Components["MuiBreadcrumbs"] = {
  styleOverrides: {
    li: {
      ...textBodySmall400,
      "& .MuiLink-root": {
        color: "inherit",
      },
    },
    ol: {
      gap: 2,
    },
    root: {
      color: inkLight,
    },
    separator: {
      margin: 0,
    },
  },
};

/**
 * MuiButton Component
 */
export const MuiButton: Components["MuiButton"] = {
  defaultProps: {
    disableRipple: true,
    disableTouchRipple: true,
  },
  styleOverrides: {
    endIcon: {
      margin: 0,
    },
    root: {
      ...textBody500,
      gap: 4,
      letterSpacing: "normal",
      padding: "10px 16px",
      textTransform: "capitalize",
    },
    startIcon: {
      marginRight: 0,
    },
  },
  variants: [
    {
      props: {
        variant: "nav",
      },
      style: {
        ...textBody500,
        color: inkMain,
        minWidth: 0,
        padding: "12px 24px",
        textTransform: "capitalize",
        whiteSpace: "nowrap",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: smokeLight,
        },
        [desktopSmUp]: {
          padding: "6px 12px",
        },
      },
    },
  ],
};

/**
 * MuiButtonBase Component
 */
export const MuiButtonBase: Components["MuiButtonBase"] = {
  defaultProps: {
    disableRipple: true,
    disableTouchRipple: true,
  },
  styleOverrides: {
    root: {
      flex: "none",
      fontFamily: fontFamily,
    },
  },
};

/**
 * MuiButtonGroup Component
 */
export const MuiButtonGroup: Components["MuiButtonGroup"] = {
  defaultProps: {
    disableElevation: true,
    disableRipple: true,
  },
  styleOverrides: {
    grouped: {
      minWidth: 0,
      padding: "6px 8px",
    },
    groupedContainedPrimary: {
      borderColor: primaryDark,
      boxShadow: `0 1px 0 0 ${primaryDark}`,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        boxShadow: `0 1px 0 0 ${primaryDark}`,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:active": {
        boxShadow: "none",
      },
    },
  },
};

/**
 * MuiCheckbox Component
 */
export const MuiCheckbox: Components["MuiCheckbox"] = {
  defaultProps: {
    size: "xsmall",
  },
  styleOverrides: {
    root: {
      color: smokeDark,
      padding: 0,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-disabled": {
        color: smokeDark,
      },
    },
  },
  variants: [
    {
      props: {
        size: "xsmall",
      },
      style: {
        fontSize: "18px",
      },
    },
  ],
};

/**
 * MuiChip Component
 */
export const MuiChip: Components["MuiChip"] = {
  defaultProps: {
    size: "small",
  },
  styleOverrides: {
    deleteIcon: {
      color: "inherit",
      margin: "0 -2px 0 0",
    },
  },
  variants: [
    {
      props: { color: "default" },
      style: {
        backgroundColor: smokeMain,
        color: inkMain,
      },
    },
    {
      props: { color: "info" },
      style: {
        backgroundColor: infoLight,
      },
    },
    {
      props: { color: "warning" },
      style: {
        backgroundColor: warningLight,
      },
    },
    {
      props: { variant: "filterTag" },
      style: {
        ...textBodySmall500,
        cursor: "pointer", // "pointer" cursor required to restore "clickable" ui
        gap: 2,
        height: 24,
        justifySelf: FLEX_START,
        padding: "0 8px",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiChip-label": {
          padding: 0,
        },
      },
    },
    {
      props: { variant: "ntag" },
      style: {
        ...textBodySmall400,
        backgroundColor: smokeMain,
        borderColor: white,
        borderStyle: "solid",
        borderWidth: 2,
        boxSizing: "content-box",
        height: 24,
      },
    },
    {
      props: { variant: "status" },
      style: {
        ...textBodySmall500,
        borderColor: white,
        borderStyle: "solid",
        borderWidth: 2,
        height: 24,
      },
    },
  ],
};

/**
 * MuiCssBaseline Component
 */
export const MuiCssBaseline: Components["MuiCssBaseline"] = {
  styleOverrides: {
    a: {
      color: primaryMain,
      textDecoration: "none",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        textDecoration: "underline",
      },
    },
    body: {
      fontFamily: fontFamily,
    },
    img: {
      display: "block",
    },
    p: {
      margin: "0 0 8px",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:last-child": {
        margin: 0,
      },
    },
    strong: {
      fontWeight: 500,
    },
  },
};

/**
 * MuiDialog Component
 */
export const MuiDialog: Components["MuiDialog"] = {
  styleOverrides: {
    paper: {
      boxShadow: elevation02,
    },
    root: {
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "& .MuiBackdrop-root": {
        backgroundColor: inkMain60,
      },
    },
  },
};

/**
 * MuiDialogActions Component
 */
export const MuiDialogActions: Components["MuiDialogActions"] = {
  styleOverrides: {
    root: {
      padding: 20,
    },
  },
};

/**
 * MuiDialogContent Component
 */
export const MuiDialogContent: Components["MuiDialogContent"] = {
  styleOverrides: {
    root: {
      borderColor: smokeMain,
      padding: 20,
    },
  },
};

/**
 * MuiDialogTitle Component
 * @param theme - Theme.
 * @returns MuiDialogTitle component theme styles.
 */
export const MuiDialogTitle = (theme: Theme): Components["MuiDialogTitle"] => {
  return {
    styleOverrides: {
      root: {
        ...theme.typography[TEXT_HEADING],
        alignItems: "center",
        display: "grid",
        gridAutoFlow: "column",
        padding: 20,
        [tabletUp]: {},
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiIconButton-edgeEnd": {
          alignSelf: FLEX_START,
          justifySelf: "flex-end",
        },
      },
    },
  };
};

/**
 * MuiDivider Component
 */
export const MuiDivider: Components["MuiDivider"] = {
  styleOverrides: {
    root: {
      borderColor: smokeMain,
    },
  },
};

/**
 * MuiDrawer Component
 */
export const MuiDrawer: Components["MuiDrawer"] = {
  styleOverrides: {
    paper: {
      overflowY: "visible", // required; allows backdrop button to render outside of drawer container
    },
  },
};

/**
 * MuiIconButton Component
 */
export const MuiIconButton: Components["MuiIconButton"] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      borderRadius: 4,
    },
    sizeLarge: {
      padding: 10,
    },
    sizeSmall: {
      padding: 6,
    },
  },
  variants: [
    {
      props: {
        color: "ink",
      },
      style: {
        color: inkMain,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: smokeLight,
        },
      },
    },
    {
      props: {
        color: "inkLight",
      },
      style: {
        color: inkLight,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: smokeLight,
        },
      },
    },
    {
      props: {
        size: "xlarge",
      },
      style: {
        padding: 14,
      },
    },
    {
      props: {
        size: "xsmall",
      },
      style: {
        padding: 4,
      },
    },
    {
      props: {
        edge: "end",
        size: "xsmall",
      },
      style: {
        marginRight: -4,
      },
    },
    {
      props: {
        size: "xxsmall",
      },
      style: {
        padding: 0,
      },
    },
  ],
};

/**
 * MuiInputBase Component
 */
export const MuiInputBase: Components["MuiInputBase"] = {
  styleOverrides: {
    adornedStart: {
      gap: 8,
    },
    root: {
      ...textBody400,
      height: 40,
      letterSpacing: "normal",
    },
  },
};

/**
 * MuiLink Component
 */
export const MuiLink: Components["MuiLink"] = {
  defaultProps: {
    underline: "hover",
  },
};

/**
 * MuiListItemButton Component
 */
export const MuiListItemButton: Components["MuiListItemButton"] = {
  styleOverrides: {
    root: {
      ...textBody400,
      minHeight: "unset",
      padding: "10px 16px",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        backgroundColor: smokeLight,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-selected": {
        backgroundColor: "unset",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: smokeLight,
        },
      },
    },
  },
};

/**
 * MuiListItemText Component
 */
export const MuiListItemText: Components["MuiListItemText"] = {
  styleOverrides: {
    root: {
      margin: 0,
    },
  },
};

/**
 * MuiMenuItem Component
 */
export const MuiMenuItem: Components["MuiMenuItem"] = {
  defaultProps: { disableRipple: true },
  styleOverrides: {
    root: {
      ...textBody400,
      minHeight: "unset",
      padding: "10px 16px",
    },
  },
};

/**
 * MuiOutlinedInput Component
 */
export const MuiOutlinedInput: Components["MuiOutlinedInput"] = {
  styleOverrides: {
    input: {
      color: inkLight,
      height: 20,
      padding: "10px 14px 10px 0",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:focus": {
        color: inkMain,
      },
    },
    notchedOutline: {
      borderColor: smokeDark,
    },
    root: {
      backgroundColor: white,
      boxShadow: `inset 0 2px 0 0 ${black04}`,
      paddingLeft: 12,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "& .MuiSvgIcon-root": {
        color: inkLight, // Adornment e.g. "SearchIcon".
      },
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: smokeDark,
        },
      },
      // eslint-disable-next-line sort-keys -- disabling key order for specificity
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: inkMain,
          borderWidth: 1,
        },
        "& .MuiSvgIcon-root": {
          color: inkMain, // Adornment e.g. "SearchIcon".
        },
      },
    },
  },
};

/**
 * MuiPaper Component
 */
export const MuiPaper: Components["MuiPaper"] = {
  variants: [
    {
      props: { variant: "footer" },
      style: {
        backgroundColor: smokeLight,
        boxShadow: `${strokeTopSmoke}, ${strokeBottomSmoke}`,
      },
    },
    {
      props: { variant: "menu" },
      style: {
        borderColor: smokeDark,
        borderRadius: 8,
        borderStyle: "solid",
        borderWidth: 1,
        boxShadow: elevation02,
      },
    },
    {
      props: { variant: "panel" },
      style: {
        borderColor: smokeMain,
        borderStyle: "solid",
        borderWidth: 1,
        boxShadow: elevation01,
      },
    },
    {
      props: { variant: "sidebar" },
      style: {
        backgroundColor: smokeLight,
        padding: "24px 0",
        width: 312,
      },
    },
  ],
};

/**
 * MuiSvgIcon Component
 */
export const MuiSvgIcon: Components["MuiSvgIcon"] = {
  styleOverrides: {
    fontSizeLarge: {
      fontSize: "32px",
    },
    fontSizeSmall: {
      fontSize: "20px",
    },
  },
  variants: [
    {
      props: {
        color: "inkLight",
      },
      style: {
        color: inkLight,
      },
    },
    {
      props: {
        fontSize: "medium",
      },
      style: {
        fontSize: "24px",
      },
    },
    {
      props: {
        fontSize: "xsmall",
      },
      style: {
        fontSize: "18px",
      },
    },
    {
      props: {
        fontSize: "xxlarge",
      },
      style: {
        fontSize: "40px",
      },
    },
    {
      props: {
        fontSize: "xxsmall",
      },
      style: {
        fontSize: "16px",
      },
    },
  ],
};

/**
 * MuiTab Component
 */
export const MuiTab: Components["MuiTab"] = {
  styleOverrides: {
    labelIcon: {
      gap: 8,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "& > img": {
        maxHeight: 20, // Tab image max height.
      },
    },
    root: {
      ...textBody500,
      color: inkLight,
      marginBottom: 3,
      minHeight: "unset",
      minWidth: "unset",
      opacity: 1,
      padding: 12,
      textTransform: "capitalize",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "& > .MuiTab-iconWrapper": {
        marginRight: 0,
      },
      "&.Mui-selected": {
        color: inkMain,
      },
    },
  },
};

/**
 * MuiTableCell Component
 */
export const MuiTableCell: Components["MuiTableCell"] = {
  styleOverrides: {
    body: {
      ...textBody400,
    },
    head: {
      ...textBodySmall500,
      padding: "20px",
    },
    root: {
      padding: "18px 20px",
    },
    sizeSmall: {
      padding: "14px 20px",
    },
    stickyHeader: {
      boxShadow: `0 1px 0 ${smokeMain}`,
    },
  },
};

/**
 * MuiTableSortLabel Component
 */
export const MuiTableSortLabel: Components["MuiTableSortLabel"] = {
  styleOverrides: {
    icon: {
      fontSize: 20,
      margin: 0,
      transition: "none",
    },
    root: {
      flex: 1,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-active": {
        color: "inherit",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiTableSortLabel-icon": {
          color: "inherit",
        },
      },
      "&:hover": {
        color: "inherit",
        opacity: 0.6,
      },
    },
  },
};

/**
 * MuiTabs Component
 */
export const MuiTabs: Components["MuiTabs"] = {
  defaultProps: {
    textColor: "inherit",
    variant: "scrollable",
  },
  styleOverrides: {
    flexContainer: {
      gap: 8,
    },
    indicator: {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      height: 3,
    },
    root: {
      boxShadow: strokeBottomSmoke,
      minHeight: "unset",
      position: "relative", // Positions scroll fuzz.
    },
    scroller: {
      margin: "0 16px",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      [tabletUp]: {
        margin: 0,
      },
    },
  },
};

/**
 * MuiToggleButton Component
 */
export const MuiToggleButton: Components["MuiToggleButton"] = {
  styleOverrides: {
    root: {
      ...textBody500,
      backgroundColor: smokeMain,
      border: "none",
      borderRadius: 4,
      color: inkMain,
      flex: 1,
      padding: "8px 12px",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        backgroundColor: smokeLightest,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-selected": {
        backgroundColor: white,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: white,
        },
      },
    },
  },
};

/**
 * MuiToggleButtonGroup Component
 */
export const MuiToggleButtonGroup: Components["MuiToggleButtonGroup"] = {
  styleOverrides: {
    grouped: {
      border: "none !important", // Overrides "grouped" css selector specificity.
      borderRadius: "4px !important", // Overrides "grouped" css selector specificity.
      margin: "0 !important", // Overrides "grouped" css selector specificity.
    },
    root: {
      backgroundColor: smokeMain,
      borderRadius: 6,
      color: inkMain,
      display: "grid",
      gridAutoColumns: "1fr",
      gridAutoFlow: "column",
      padding: 2,
    },
  },
};

/**
 * MuiToolbar Component
 */
export const MuiToolbar: Components["MuiToolbar"] = {
  styleOverrides: {
    root: {
      [mobileUp]: {
        paddingLeft: 12,
        paddingRight: 12,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      [desktopUp]: {
        paddingLeft: 16,
        paddingRight: 16,
      },
    },
  },
};

/**
 * MuiTooltip Component
 */
export const MuiTooltip: Components["MuiTooltip"] = {
  styleOverrides: {
    arrow: {
      color: inkMain,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:before": {
        borderRadius: 1,
      },
    },
    tooltip: {
      ...textBodySmall400,
      backgroundColor: inkMain,
      boxShadow: elevation02,
      padding: "8px 12px",
    },
  },
};

/**
 * MuiTypography Component
 */
export const MuiTypography: Components["MuiTypography"] = {
  defaultProps: {
    variant: "inherit",
  },
  styleOverrides: {
    gutterBottom: {
      marginBottom: 8,
    },
  },
};
