import { Components } from "@mui/material";
import { desktopSmUp, desktopUp, mobileUp, tabletUp } from "./breakpoints";
import {
  alpha32,
  alpha80,
  black04,
  infoLight,
  infoLightest,
  infoMain,
  inkLight,
  inkMain,
  primaryDark,
  primaryMain,
  smokeDark,
  smokeLight,
  smokeLightest,
  smokeMain,
  warningLight,
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
  textBody500,
  textBodySmall400,
  textBodySmall500,
} from "./typography";

/**
 * MuiAlert Component
 */
export const MuiAlert: Components["MuiAlert"] = {
  styleOverrides: {
    icon: {
      opacity: 1,
      padding: 0,
    },
    message: {
      padding: 0,
    },
    root: {
      ...textBody400,
    },
    standard: {
      alignItems: "center",
      boxShadow: elevation01,
      color: inkMain,
      padding: 16,
    },
    standardInfo: {
      backgroundColor: infoLightest,
      border: `1px solid ${infoMain}${alpha32}`, // TODO combine alpha
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "& .MuiAlert-icon": {
        color: infoMain,
      },
    },
  },
  variants: [
    {
      props: { color: "info", variant: "neutral" },
      style: {
        backgroundColor: smokeLight,
        padding: 16,
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
      ...textBody500,
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
      backgroundColor: `${inkMain}${alpha80}`, // TODO alpha
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
        justifySelf: "flex-start",
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
    strong: {
      fontWeight: 500,
    },
  },
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
        padding: 2,
      },
    },
    {
      props: {
        edge: "end",
        size: "xsmall",
      },
      style: {
        marginRight: -2,
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
