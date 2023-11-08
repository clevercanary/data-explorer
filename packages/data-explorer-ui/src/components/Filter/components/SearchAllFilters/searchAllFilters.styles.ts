import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Autocomplete as MAutocomplete } from "@mui/material";
import { inkMain } from "../../../../styles/common/mixins/colors";

interface MatchHighlightProps {
  leftOpen: boolean;
  rightOpen: boolean;
}

export const Autocomplete = styled(MAutocomplete)`
  &.Mui-expanded {
    .MuiOutlinedInput-root {
      .MuiIconButton-root {
        .MuiSvgIcon-root {
          color: ${inkMain};
        }
      }
    }
  }
` as typeof MAutocomplete;

export const MatchHighlight = styled.mark<MatchHighlightProps>`
  background: ${({ theme }) => theme.palette.warning.light};
  color: inherit;
  padding: 2px 0;

  ${({ leftOpen }) =>
    leftOpen &&
    css`
      padding-left: 2px;
      margin-left: -2px;
    `}

  ${({ rightOpen }) =>
    rightOpen &&
    css`
      padding-right: 2px;
      margin-right: -2px;
    `}
`;
