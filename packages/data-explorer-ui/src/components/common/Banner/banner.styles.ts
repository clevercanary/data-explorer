import styled from "@emotion/styled";

export const Banner = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.common.white};
  padding: 8px;
  line-height: 1;
  text-align: center;
`;
