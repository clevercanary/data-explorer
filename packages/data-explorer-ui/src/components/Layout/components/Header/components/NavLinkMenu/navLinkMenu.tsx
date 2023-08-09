import {
  ListItemIcon,
  ListItemText,
  MenuItem as MMenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { MouseEvent, ReactNode, useState } from "react";
import { NavigationButton as Button } from "../../../../../common/Button/components/NavigationButton/navigationButton";
import { NavLinkMenu as Menu } from "./navLinkMenu.styles";

export interface MenuItem {
  description?: string;
  icon?: ReactNode;
  label: string;
  url: string;
}

export interface NavLinkMenuProps {
  menuItems: MenuItem[];
  menuLabel: string;
}

export const NavLinkMenu = ({
  menuItems,
  menuLabel,
}: NavLinkMenuProps): JSX.Element => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const onOpenMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button isActive={open} onClick={onOpenMenu}>
        {menuLabel}
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        autoFocus={false}
        onClose={onCloseMenu}
        open={open}
        slotProps={{ paper: { variant: "menu" } }}
        transformOrigin={{
          horizontal: "left",
          vertical: "top",
        }}
      >
        {menuItems.map(({ description, icon, label, url }) => (
          <MMenuItem
            key={label}
            onClick={(): void => {
              setAnchorEl(null);
              router.push(url);
            }}
          >
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                variant: description ? "text-body-500" : "text-body-400",
              }}
              secondary={description}
              secondaryTypographyProps={{
                variant: "text-body-small-400-2lines",
              }}
            />
          </MMenuItem>
        ))}
      </Menu>
    </>
  );
};
