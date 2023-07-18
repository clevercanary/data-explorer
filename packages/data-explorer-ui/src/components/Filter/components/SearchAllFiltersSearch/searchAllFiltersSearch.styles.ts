import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const InputField = styled(TextField)`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .MuiInputBase-root ::placeholder {
    opacity: 1;
    color: ${({ theme }) => theme.palette.ink.light};
  }

  .MuiInputBase-root.Mui-focused ::placeholder {
    opacity: 0;
  }

  .MuiOutlinedInput-root.MuiInputBase-sizeSmall {
    padding: 0 0 0 12px;
  }

  .MuiOutlinedInput-root.MuiInputBase-sizeSmall .MuiAutocomplete-input {
    padding: 10px 14px 10px 0;
  }

  ${({ theme }) =>
    css`
      .MuiOutlinedInput-input,
      .MuiSvgIcon-root {
        color: ${theme.palette.ink.main};
      }
    `};
`;
