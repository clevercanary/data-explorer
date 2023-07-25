import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Autocomplete, Divider, Paper } from "@mui/material";
import { FilterOption } from "./searchAllFilters";

interface MatchHighlightProps {
  leftOpen: boolean;
  rightOpen: boolean;
}

export const SearchAllFilters = styled(
  Autocomplete<FilterOption, false, false, true>
)`
  margin-bottom: 16px;
  padding: 0 16px;
`;

export const SearchAllFiltersMenuPaper = styled(Paper)`
  width: fit-content;
`;

export const GroupHeading = styled.div`
  padding: 8px 16px;
`;

export const GroupDivider = styled(Divider)`
  margin: 8px 0;
`;

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
