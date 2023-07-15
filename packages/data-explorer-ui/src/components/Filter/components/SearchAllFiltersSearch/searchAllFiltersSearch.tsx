import { OutlinedTextFieldProps } from "@mui/material";
import React from "react";
import { SearchIcon } from "../../../common/CustomIcon/components/SearchIcon/searchIcon";
import { InputField } from "./searchAllFiltersSearch.styles";

/**
 * Basic input component.
 */

export interface InputProps {
  InputProps: OutlinedTextFieldProps["InputProps"];
  inputProps: OutlinedTextFieldProps["inputProps"];
}

export const SearchAllFiltersSearch = ({
  inputProps,
  InputProps,
  ...props /* Receive props from Autocomplete */
}: InputProps): JSX.Element => {
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
      placeholder="Search all filters"
      size="small"
    />
  );
};
