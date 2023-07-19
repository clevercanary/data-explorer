import { TextFieldProps } from "@mui/material";
import React from "react";
import { SearchIcon } from "../../../common/CustomIcon/components/SearchIcon/searchIcon";
import { InputField } from "./searchAllFiltersSearch.styles";

export const SearchAllFiltersSearch = ({
  inputProps,
  InputProps,
  ...props
}: TextFieldProps): JSX.Element => {
  return (
    <InputField
      {...props}
      variant="outlined"
      fullWidth
      InputProps={{
        ...(InputProps || {}),
        startAdornment: <SearchIcon fontSize="small" />,
      }}
      inputProps={{ ...(inputProps || {}), spellCheck: false }}
      placeholder="Search all filters..."
      size="small"
    />
  );
};
