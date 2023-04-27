import styled from "@emotion/styled";
import { Banner } from "./banner";

export const BannerPrimary = styled(Banner)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.common.white};
  padding: 8px;
  text-align: center;
`;
