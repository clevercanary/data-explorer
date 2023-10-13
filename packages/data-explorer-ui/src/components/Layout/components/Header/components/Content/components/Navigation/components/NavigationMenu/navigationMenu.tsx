import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { MenuProps as MMenuProps } from "@mui/material";
import React, { MouseEvent, ReactNode, useState } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../../../../../hooks/useBreakpointHelper";
import { DESKTOP_SM } from "../../../../../../../../../../theme/common/breakpoints";
import {
  MenuItem,
  NavigationMenuItems,
} from "../NavigationMenuItems/navigationMenuItems";
import { Button, Menu } from "./navigationMenu.styles";

export interface NavLinkMenuProps {
  anchorOrigin?: MMenuProps["anchorOrigin"];
  closeAncestor?: () => void;
  menuItems: MenuItem[];
  menuLabel: ReactNode;
}

export const NavigationMenu = ({
  anchorOrigin = { horizontal: "left", vertical: "bottom" },
  closeAncestor,
  menuItems,
  menuLabel,
}: NavLinkMenuProps): JSX.Element => {
  const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);
  const openMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = (): void => {
    closeAncestor?.();
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        EndIcon={ArrowDropDownRoundedIcon}
        isActive={open}
        onClick={openMenu}
        variant="nav"
      >
        {menuLabel}
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        onClose={closeMenu}
        open={smDesktop && open}
        slotProps={{ paper: { variant: "menu" } }}
        transformOrigin={{
          horizontal: "left",
          vertical: "top",
        }}
      >
        <NavigationMenuItems closeMenu={closeMenu} menuItems={menuItems} />
      </Menu>
    </>
  );
};
