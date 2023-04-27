import styled from "@emotion/styled";
import { Banner } from "./banner";

export const BannerPrimary = styled(Banner)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.common.white};
  padding: 8px;
  text-align: center;

  & > a {
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 13px;
    font-weight: 500;
    text-decoration: underline;
  }
`;
