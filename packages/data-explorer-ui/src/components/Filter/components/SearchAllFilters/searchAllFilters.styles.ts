import styled from "@emotion/styled";
import { Autocomplete } from "@mui/material";
import { FilterOption } from "./searchAllFilters";

export const SearchAllFilters = styled(
  Autocomplete<FilterOption, false, false, true>
)`
  margin-bottom: 16px;
  padding: 0 16px;
`;

export const GroupHeading = styled.div`
  padding: 8px 16px;
`;
