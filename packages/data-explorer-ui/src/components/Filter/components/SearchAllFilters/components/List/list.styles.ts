import styled from "@emotion/styled/dist/emotion-styled.cjs";
import { LIST_MARGIN } from "../../../../common/constants";
import { List as FilterList } from "../../../FilterList/filterList.styles";

export const List = styled(FilterList)`
  && {
    margin: 0; // Temporarily override the margin until list is virtualized.
    padding: ${LIST_MARGIN}px 0; // Temporarily override the padding until list is virtualized.
  }

  &.MuiAutocomplete-listbox {
    max-height: fit-content;
  }
`;
