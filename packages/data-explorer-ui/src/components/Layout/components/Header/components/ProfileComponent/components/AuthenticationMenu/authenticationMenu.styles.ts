import styled from "@emotion/styled";
import { Avatar as MAvatar, MenuItem, Typography } from "@mui/material";

export const UserSummary = styled(MenuItem)`
  display: block;
  cursor: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.palette.smoke.main};
  padding-bottom: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  &:hover,
  &:focus {
    background: inherit;
  }
`;

export const UserNames = styled(Typography)`
  font-weight: 500;
  max-width: 200px;
`;

export const Avatar = styled(MAvatar)`
  height: 32px;
  width: 32px;
`;
