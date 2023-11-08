import styled from "@emotion/styled";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";
import { HEADER_HEIGHT } from "../Header/common/constants";

export const Sidebar = styled.div`
  align-self: stretch;
  border-right: 1px solid ${({ theme }) => theme.palette.smoke.main};
  box-sizing: content-box;
  width: 264px;
`;

export const SidebarPositioner = styled.div`
  height: 100%;
  overflow: visible;
  padding: 16px 0;

  ${mediaDesktopSmallUp} {
    height: calc(100vh - ${HEADER_HEIGHT}px);
    overflow: auto;
    padding: 0;
    position: sticky;
    top: ${HEADER_HEIGHT}px;
  }
`;
