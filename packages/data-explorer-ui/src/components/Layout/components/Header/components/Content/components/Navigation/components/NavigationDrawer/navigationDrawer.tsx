import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { Dialog as MDialog } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { Button } from "../../../../../../../../../common/Button/button";
import { BackArrowIcon } from "../../../../../../../../../common/CustomIcon/components/BackArrowIcon/backArrowIcon";
import { HeaderProps } from "../../../../../../header";
import { DrawerNavigation as Navigation } from "../../../Actions/components/Menu/components/Content/components/Navigation/navigation.styles";
import { Toolbar } from "../../../Actions/components/Menu/components/Toolbar/toolbar";
import { MenuItem } from "../NavigationMenuItems/navigationMenuItems";
import { Slide } from "./components/Slide/slide";
import { Button as BackButton, Content } from "./navigationDrawer.styles";

export interface NavigationDrawerProps {
  closeAncestor?: () => void;
  headerProps?: HeaderProps;
  menuItems: MenuItem[];
  menuLabel: ReactNode;
}

export const NavigationDrawer = ({
  closeAncestor,
  headerProps,
  menuItems,
  menuLabel,
}: NavigationDrawerProps): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const openDrawer = (): void => {
    setDrawerOpen(true);
  };
  const closeDrawer = (): void => {
    setDrawerOpen(false);
  };
  const closeDrawers = (): void => {
    setDrawerOpen(false);
    closeAncestor?.();
  };
  return (
    <>
      <Button
        EndIcon={ArrowDropDownRoundedIcon}
        onClick={openDrawer}
        variant="nav"
      >
        {menuLabel}
      </Button>
      <MDialog
        disableScrollLock
        fullScreen
        hideBackdrop
        keepMounted={false}
        onClose={closeDrawers}
        open={drawerOpen}
        PaperProps={{ elevation: 0 }}
        TransitionComponent={Slide}
        transitionDuration={300}
      >
        <Toolbar onClose={closeDrawers} {...headerProps} />
        <Content>
          <BackButton
            fullWidth
            onClick={closeDrawer}
            StartIcon={BackArrowIcon}
            variant="nav"
          >
            {menuLabel}
          </BackButton>
          <Navigation
            closeAncestor={closeDrawers}
            headerProps={headerProps}
            links={menuItems}
          />
        </Content>
      </MDialog>
    </>
  );
};
