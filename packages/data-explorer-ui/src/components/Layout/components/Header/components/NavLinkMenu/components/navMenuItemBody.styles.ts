import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const Label = styled(Typography)`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.palette.ink.light};
  display: block;
  max-width: 290px;
  white-space: normal;
`;
