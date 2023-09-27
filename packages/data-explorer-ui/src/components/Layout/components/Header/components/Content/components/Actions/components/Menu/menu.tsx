import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Dialog as MDialog, Fade, IconButton } from "@mui/material";
import React, { CSSProperties, forwardRef, useEffect } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../../../../../hooks/useBreakpointHelper";
import { DESKTOP_SM } from "../../../../../../../../../../theme/common/breakpoints";
import { SWITCH_TRANSITION_PROPS } from "../../../../../../common/constants";
import { HeaderProps } from "../../../../../../header";
import { Navigation } from "./components/Content/components/Navigation/navigation.styles";
import { Slogan } from "./components/Content/components/Slogan/slogan.styles";
import { Socials } from "./components/Content/components/Socials/socials.styles";
import { Content } from "./components/Content/content.styles";
import { Toolbar } from "./components/Toolbar/toolbar";

export interface MenuProps {
  closeMenu: () => void;
  headerProps: HeaderProps;
  open: boolean;
  openMenu: () => void;
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

export const Menu = forwardRef<HTMLButtonElement, MenuProps>(
  function HeaderMenu(
    { closeMenu, headerProps, open, openMenu, style }: MenuProps,
    ref
  ): JSX.Element {
    const { navLinks, slogan, socials } = headerProps;
    const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
    const switchProps = SWITCH_TRANSITION_PROPS;

    // Set drawer open state to false on change of media breakpoint from mobile to "small desktop".
    useEffect(() => {
      if (smDesktop) {
        closeMenu();
      }
    }, [closeMenu, smDesktop]);

    return (
      <>
        <Fade in={!smDesktop} {...switchProps}>
          <IconButton color="ink" onClick={openMenu} ref={ref} style={style}>
            <MenuRoundedIcon />
          </IconButton>
        </Fade>
        <MDialog
          fullScreen
          hideBackdrop
          keepMounted={false}
          onClose={closeMenu}
          open={open}
          PaperProps={{ elevation: 0 }}
          TransitionComponent={Fade}
          transitionDuration={smDesktop ? 0 : 600}
          TransitionProps={{ easing: "ease-out" }}
        >
          <Toolbar onClose={closeMenu} {...headerProps} />
          <Content>
            {slogan && <Slogan>{slogan}</Slogan>}
            <Navigation
              closeAncestor={closeMenu}
              headerProps={headerProps}
              links={navLinks}
            />
            <Socials buttonSize="xlarge" socials={socials} />
          </Content>
        </MDialog>
      </>
    );
  }
);
