import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { CSSProperties, forwardRef, ReactNode } from "react";
import { ELEMENT_ALIGNMENT } from "../../../../../../../../common/entities";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../../../hooks/useBreakpointHelper";
import { DESKTOP_SM } from "../../../../../../../../theme/common/breakpoints";
import { ANCHOR_TARGET } from "../../../../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../../../../Links/common/utils";
import { HeaderProps } from "../../../../header";
import { NavigationDrawer } from "./components/NavigationDrawer/navigationDrawer";
import { NavigationMenu } from "./components/NavigationMenu/navigationMenu";
import { MenuItem } from "./components/NavigationMenuItems/navigationMenuItems";
import { Navigation as Links } from "./navigation.styles";

export type NavAlignment = Exclude<ELEMENT_ALIGNMENT, ELEMENT_ALIGNMENT.RIGHT>;

export interface NavLinkItem {
  label: ReactNode;
  menuItems?: MenuItem[];
  target?: ANCHOR_TARGET;
  url: string;
}

export interface NavigationProps {
  center?: boolean;
  className?: string;
  closeAncestor?: () => void;
  headerProps?: HeaderProps;
  links: NavLinkItem[];
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

export const Navigation = forwardRef<HTMLDivElement, NavigationProps>(
  function Navigation(
    {
      center = false,
      className,
      closeAncestor,
      headerProps,
      links,
      style,
    }: NavigationProps,
    ref
  ): JSX.Element {
    const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
    const router = useRouter();
    return (
      <Links ref={ref} center={center} className={className} style={style}>
        {links.map(
          ({ label, menuItems, target = ANCHOR_TARGET.SELF, url }, i) =>
            menuItems ? (
              smDesktop ? (
                <NavigationMenu
                  key={i}
                  closeAncestor={closeAncestor}
                  menuItems={menuItems}
                  menuLabel={label}
                />
              ) : (
                <NavigationDrawer
                  key={i}
                  closeAncestor={closeAncestor}
                  headerProps={headerProps}
                  menuItems={menuItems}
                  menuLabel={label}
                />
              )
            ) : (
              <Button
                key={i}
                onClick={(): void => {
                  isClientSideNavigation(url)
                    ? router.push(url)
                    : window.open(url, target);
                  closeAncestor?.();
                }}
                variant="nav"
              >
                {label}
              </Button>
            )
        )}
      </Links>
    );
  }
);
