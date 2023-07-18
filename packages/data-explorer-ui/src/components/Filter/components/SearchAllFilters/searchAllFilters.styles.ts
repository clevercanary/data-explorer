import styled from "@emotion/styled";
import { Autocomplete, Divider, Paper } from "@mui/material";
import { FilterOption } from "./searchAllFilters";

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
  &&:first-of-type {
    display: none;
  }
`;
