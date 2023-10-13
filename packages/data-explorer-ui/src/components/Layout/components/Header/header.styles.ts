import styled from "@emotion/styled";
import { AppBar as MAppBar, Toolbar as MToolBar } from "@mui/material";
import { HEADER_HEIGHT } from "./common/constants";

export const AppBar = styled(MAppBar)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.smoke.main};
`;

export const Toolbar = styled(MToolBar)`
  & {
    gap: 16px;
    height: ${HEADER_HEIGHT}px;
    min-height: unset;
  }
`;
