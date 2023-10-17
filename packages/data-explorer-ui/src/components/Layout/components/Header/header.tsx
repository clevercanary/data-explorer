import { Fade } from "@mui/material";
import React, { ReactNode, useCallback, useState } from "react";
import { ELEMENT_ALIGNMENT } from "../../../../common/entities";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { DESKTOP, DESKTOP_SM } from "../../../../theme/common/breakpoints";
import { Social } from "../../../common/Socials/socials";
import { FADE_TRANSITION_PROPS } from "./common/constants";
import { getHeaderNavigationLinks } from "./common/utils";
import { Actions } from "./components/Content/components/Actions/actions";
import { Authentication } from "./components/Content/components/Actions/components/Authentication/authentication";
import { Menu } from "./components/Content/components/Actions/components/Menu/menu";
import { Search } from "./components/Content/components/Actions/components/Search/search";
import { Logo, LogoProps } from "./components/Content/components/Logo/logo";
import {
  NavAlignment,
  Navigation,
  NavLinkItem,
} from "./components/Content/components/Navigation/navigation";
import { Slogan } from "./components/Content/components/Slogan/slogan";
import { Divider } from "./components/Content/components/Slogan/slogan.styles";
import { Socials } from "./components/Content/components/Socials/socials.styles";
import { AppBar, Toolbar } from "./header.styles";

export interface HeaderProps {
  authenticationEnabled?: boolean;
  logo: LogoProps;
  navAlignment?: NavAlignment;
  navLinks: NavLinkItem[];
  searchEnabled?: boolean;
  searchURL?: string;
  slogan?: ReactNode;
  socials: Social[];
}

export const Header = ({ ...headerProps }: HeaderProps): JSX.Element => {
  const {
    authenticationEnabled,
    logo,
    navAlignment = ELEMENT_ALIGNMENT.LEFT,
    navLinks,
    searchEnabled,
    searchURL,
    slogan,
    socials,
  } = headerProps;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const onlySmDesktop = useBreakpointHelper(
    BREAKPOINT_FN_NAME.ONLY,
    DESKTOP_SM
  );
  const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
  const desktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP);
  const showActions = searchEnabled || authenticationEnabled || !smDesktop;
  const isNavigationIn = smDesktop;
  const isSloganIn = Boolean(slogan) && smDesktop;
  const isSocialsIn = desktop;
  const fadeProps = FADE_TRANSITION_PROPS;

  // Closes header menu.
  const closeMenu = useCallback((): void => {
    setMenuOpen(false);
  }, []);

  // Opens header menu.
  const openMenu = useCallback((): void => {
    setMenuOpen(true);
  }, []);

  return (
    <AppBar elevation={1} position="fixed">
      <Toolbar variant="dense">
        {/* Logo */}
        <Logo {...logo} />
        {/* Divider */}
        <Fade
          in={isSloganIn}
          style={{ transitionDelay: isSloganIn ? "50ms" : "0ms" }}
          {...fadeProps}
        >
          <Divider orientation="vertical" />
        </Fade>
        {/* Slogan */}
        <Fade
          in={isSloganIn}
          style={{ transitionDelay: isSloganIn ? "50ms" : "0ms" }}
          {...fadeProps}
        >
          <Slogan slogan={slogan} />
        </Fade>
        {/* Navigation */}
        <Fade in={isNavigationIn} {...fadeProps}>
          <Navigation
            center={navAlignment === ELEMENT_ALIGNMENT.CENTER}
            headerProps={headerProps}
            links={getHeaderNavigationLinks(navLinks, socials, onlySmDesktop)}
          />
        </Fade>
        {/* Socials */}
        <Fade in={isSocialsIn} {...fadeProps}>
          <Socials buttonSize="small" socials={socials} />
        </Fade>
        {/* Actions */}
        <Actions showActions={showActions}>
          {/* Search */}
          <Search
            closeMenu={closeMenu}
            searchEnabled={searchEnabled}
            searchURL={searchURL}
          />
          {/* Authentication */}
          <Authentication
            authenticationEnabled={authenticationEnabled}
            closeMenu={closeMenu}
          />
          {/* Menu */}
          <Menu
            closeMenu={closeMenu}
            headerProps={headerProps}
            open={menuOpen}
            openMenu={openMenu}
          />
        </Actions>
      </Toolbar>
    </AppBar>
  );
};
