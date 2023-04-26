import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { MouseEvent, useState } from "react";
import { UserProfile } from "../../../../../../../providers/authentication";
import * as Styled from "./authenticationMenu.styles";

export interface AuthenticationMenuProps {
  menuPosition: "left" | "right";
  onLogout: () => void;
  userProfile: UserProfile;
}

export const AuthenticationMenu = ({
  menuPosition = "left",
  onLogout,
  userProfile,
}: AuthenticationMenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);
  const growTo = menuPosition === "left" ? "right" : "left";

  const onOpenMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={onOpenMenu}>
        <Styled.Avatar
          alt={`${userProfile.given_name} ${userProfile.family_name}`}
          src={userProfile.picture}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: growTo, vertical: "bottom" }}
        autoFocus={false}
        onClose={onCloseMenu}
        open={open}
        transformOrigin={{
          horizontal: growTo,
          vertical: "top",
        }}
      >
        <Styled.UserSummary>
          You are signed in as:
          <Styled.UserNames noWrap>
            {userProfile.given_name} {userProfile.family_name}
          </Styled.UserNames>
        </Styled.UserSummary>
        <MenuItem
          onClick={(): void => {
            setAnchorEl(null);
            onLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
