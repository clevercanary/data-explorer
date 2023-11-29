import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton, Toolbar as MToolbar } from "@mui/material";
import React, { Fragment, ReactNode } from "react";
import { Actions } from "../../../../actions";
import { Authentication } from "../../../Authentication/authentication";
import { Search } from "../../../Search/search";

export interface DialogTitleProps {
  Announcements?: ReactNode;
  authenticationEnabled?: boolean;
  Logo?: ReactNode;
  onClose: () => void;
  searchEnabled?: boolean;
  searchURL?: string;
}

export const Toolbar = ({
  Announcements,
  authenticationEnabled,
  Logo,
  onClose,
  searchEnabled,
  searchURL,
}: DialogTitleProps): JSX.Element => {
  return (
    <Fragment>
      {Announcements}
      <MToolbar>
        {Logo}
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
      </MToolbar>
    </Fragment>
  );
};
