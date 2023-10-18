import styled from "@emotion/styled";
import { Fab as MFab, Popover as MPopover } from "@mui/material";
import { smokeMain } from "../../../../../../styles/common/mixins/colors";
import { shadows02 } from "../../../../../../styles/common/mixins/shadows";
import { tabletUp } from "../../../../../../theme/common/breakpoints";
import { alpha80, inkMain } from "../../../../../../theme/common/palette";

export const Fab = styled(MFab)`
  bottom: 16px;
  box-shadow: ${shadows02};
  position: fixed;
  right: 16px;
  z-index: 1350; // Above backdrop component.
`;

export const Popover = styled(MPopover)`
  &.MuiPopover-root {
    background-color: ${inkMain}${alpha80};

    > .MuiPaper-root {
      border: 1px solid ${smokeMain};
      border-radius: 8px;
      width: 100%;

      ${tabletUp} {
        max-width: 496px;
      }
    }
  }
`;
