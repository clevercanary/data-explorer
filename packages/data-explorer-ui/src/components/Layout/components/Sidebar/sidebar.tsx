import { CloseRounded } from "@mui/icons-material";
import React, { ReactNode, useEffect } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { DESKTOP_SM } from "../../../../theme/common/breakpoints";
import { CloseDrawerIconButton } from "../../../common/IconButton/iconButton.styles";
import {
  Drawer,
  Sidebar as PermanentSidebar,
  SidebarPositioner,
} from "./sidebar.styles";

export interface SidebarProps {
  children: ReactNode | ReactNode[];
  drawerOpen?: boolean;
  onDrawerClose?: () => void;
}

export const Sidebar = ({
  children,
  drawerOpen,
  onDrawerClose,
}: SidebarProps): JSX.Element => {
  const tabletDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, DESKTOP_SM);
  const controlledSidebar = typeof drawerOpen === "boolean";
  const drawerSidebar = controlledSidebar && tabletDown; // Sidebar is "temporary" drawer when drawerOpen is defined and breakpoint is smaller than the given breakpoint.
  const Bar = drawerSidebar ? Drawer : PermanentSidebar;
  const transitionDuration = drawerOpen ? 250 : 300;
  const barProps = drawerSidebar
    ? {
        PaperProps: {
          elevation: 0,
        },
        SlideProps: { easing: "ease-out" },
        keepMounted: true, // Required for body overflow to be set to "hidden" when drawer is open.
        onClose: onDrawerClose,
        open: drawerOpen,
        transitionDuration,
      }
    : {};

  // Closes an open, controlled drawer sidebar with a change of breakpoint.
  useEffect(() => {
    if (drawerOpen && !tabletDown) {
      onDrawerClose?.();
    }
  }, [drawerOpen, onDrawerClose, tabletDown]);

  return (
    <Bar {...barProps}>
      {drawerOpen && tabletDown && (
        <CloseDrawerIconButton
          Icon={CloseRounded}
          onClick={onDrawerClose}
          size="medium"
        />
      )}
      <SidebarPositioner>{children}</SidebarPositioner>
    </Bar>
  );
};
