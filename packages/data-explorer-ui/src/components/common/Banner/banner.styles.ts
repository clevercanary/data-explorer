import styled from "@emotion/styled";

export const Banner = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  justify-content: center;
  padding: 8px;
`;
