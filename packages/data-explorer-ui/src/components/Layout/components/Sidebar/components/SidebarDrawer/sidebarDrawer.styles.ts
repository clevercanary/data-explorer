import styled from "@emotion/styled";
import { Popover as MPopover } from "@mui/material";
import { mediaDesktopSmallDown } from "../../../../../../styles/common/mixins/breakpoints";
import { smokeLight } from "../../../../../../styles/common/mixins/colors";

export const TemporarySidebar = styled(MPopover)`
  &.MuiPopover-root {
    ${mediaDesktopSmallDown} {
      & .MuiPaper-root {
        background-color: ${smokeLight};
        box-shadow: 0 1px 4px 0 transparent; // required; possible bug - box shadow "none" affects rendering of main content.
        height: 100%;
        max-height: 100%;
        overflow: visible; // required; allows backdrop button to render outside of drawer container.
        width: 312px;
      }
    }
  }
`;
