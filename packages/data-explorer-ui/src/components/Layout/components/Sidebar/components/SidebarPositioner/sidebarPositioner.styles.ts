import styled from "@emotion/styled";
import { mediaDesktopSmallUp } from "../../../../../../styles/common/mixins/breakpoints";

export const SidebarPositioner = styled("div")`
  height: 100%;
  overflow: visible;
  padding: 16px 0;

  ${mediaDesktopSmallUp} {
    height: auto;
    overflow: auto;
    padding: 0;
    position: sticky;
  }
`;
