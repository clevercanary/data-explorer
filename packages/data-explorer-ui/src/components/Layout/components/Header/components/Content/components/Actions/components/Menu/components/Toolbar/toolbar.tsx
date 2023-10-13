import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "@mui/material";
import React from "react";
import { Toolbar as DXToolbar } from "../../../../../../../../header.styles";
import { Logo, LogoProps } from "../../../../../Logo/logo";
import { Actions } from "../../../../actions";
import { Authentication } from "../../../Authentication/authentication";
import { Search } from "../../../Search/search";

export interface DialogTitleProps {
  authenticationEnabled?: boolean;
  logo?: LogoProps;
  onClose: () => void;
  searchEnabled?: boolean;
  searchURL?: string;
}

export const Toolbar = ({
  authenticationEnabled,
  logo,
  onClose,
  searchEnabled,
  searchURL,
}: DialogTitleProps): JSX.Element => {
  return (
    <DXToolbar>
      {logo && <Logo {...logo} />}
      <Actions>
        {/* Search */}
        <Search
          closeMenu={onClose}
          searchEnabled={searchEnabled}
          searchURL={searchURL}
        />
        {/* Authentication */}
        <Authentication
          authenticationEnabled={authenticationEnabled}
          closeMenu={onClose}
        />
        {/* Close menu */}
        <IconButton color="ink" onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Actions>
    </DXToolbar>
  );
};
