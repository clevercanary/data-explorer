import styled from "@emotion/styled";
import {
  mediaDesktopSmallUp,
  mediaTabletUp,
} from "../../../../../../styles/common/mixins/breakpoints";
import { ButtonSecondary } from "../../../../../common/Button/components/ButtonSecondary/buttonSecondary";

export const SidebarButton = styled(ButtonSecondary)`
  grid-column: 1 / -1;
  padding: 10px;

  ${mediaTabletUp} {
    grid-column: 2;
    justify-self: flex-end;
  }

  ${mediaDesktopSmallUp} {
    display: none;
  }
`;
