import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React from "react";
import { IconButton } from "./searchCloseButton.styles";

export interface SearchCloseButtonProps {
  closeSearch: () => void;
}

export const SearchCloseButton = ({
  closeSearch,
}: SearchCloseButtonProps): JSX.Element => {
  return (
    <IconButton onClick={closeSearch} size="large">
      <CloseRoundedIcon fontSize="small" />
    </IconButton>
  );
};
