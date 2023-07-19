import styled from "@emotion/styled";
import { LIST_MARGIN } from "../../common/constants";

interface Props {
  menuWidth: number;
}

export const FilterView = styled.div<Props>`
  width: ${({ menuWidth }) => `${menuWidth}px`};

  // List
  .MuiList-root {
    overflow-wrap: break-word;
    margin: ${LIST_MARGIN}px 0;
    padding: 0;
  }

  // List item
  .MuiListItemButton-root {
    gap: 8px;
  }

  // List item text
  .MuiListItemText-root {
    align-items: center;
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr auto;

    > span {
      min-width: 0; /* required; flexbox child min-width property is "auto" by default making overflow-wrap ineffectual */
    }
  }
`;
