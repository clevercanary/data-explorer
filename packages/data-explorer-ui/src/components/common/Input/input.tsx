import { Typography } from "@mui/material";
import React, { ChangeEvent, ElementType, forwardRef } from "react";
import { SetSearchTermFn } from "../../Filter/common/entities";
import { InputField, InputFormControl } from "./input.styles";

/**
 * Basic input component.
 */

export interface InputProps {
  className?: string;
  label?: string;
  placeholder?: string;
  searchTerm: string;
  setSearchTerm: SetSearchTermFn;
  StartAdornment?: ElementType;
}

/**
 * Callback fired when the search term is changed.
 * - Sets state searchTerm with new search term.
 * @param changeEvent - Change event on input element.
 * @param setSearchTerm - Function invoked to update state with the search term.
 */
function onChangeInputField(
  changeEvent: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  setSearchTerm: SetSearchTermFn
): void {
  const searchTerm = changeEvent.target.value;
  setSearchTerm(searchTerm);
}

export const Input = forwardRef(function Input(
  {
    className,
    label,
    placeholder,
    searchTerm,
    setSearchTerm,
    StartAdornment,
    ...props /* Spread props to allow for Mui OutlinedInputProps specific prop overrides e.g. "disabled". */
  }: InputProps,
  ref
): JSX.Element {
  return (
    <InputFormControl className={className}>
      {label && <Typography variant="text-body-400">{label}</Typography>}
      <InputField
        autoFocus
        fullWidth
        inputProps={{ spellCheck: false }}
        isFilled={!!searchTerm}
        onChange={(event): void => onChangeInputField(event, setSearchTerm)}
        placeholder={placeholder}
        ref={ref}
        size="small"
        startAdornment={
          StartAdornment ? <StartAdornment fontSize="small" /> : undefined
        }
        value={searchTerm}
        {...props}
      />
    </InputFormControl>
  );
});
