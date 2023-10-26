import styled from "@emotion/styled";
import { Drawer as MDrawer } from "@mui/material";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";
import { smokeLight } from "../../../../styles/common/mixins/colors";
import { HEADER_HEIGHT } from "../Header/common/constants";

export const Sidebar = styled.div`
  align-self: stretch;
  border-right: 1px solid ${({ theme }) => theme.palette.smoke.main};
  box-sizing: content-box;
  width: 264px;
`;

export const Drawer = styled(MDrawer)`
  .MuiPaper-root {
    background-color: ${smokeLight};
    width: 312px;
  }
`;

export const SidebarPositioner = styled.div`
  overflow-y: scroll;
  padding: 16px 0;

  ${mediaDesktopSmallUp} {
    height: calc(100vh - ${HEADER_HEIGHT}px);
    padding: 0;
    position: sticky;
    top: ${HEADER_HEIGHT}px;
  }
`;
