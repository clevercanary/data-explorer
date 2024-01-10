import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface MatchHighlightProps {
  leftOpen: boolean;
  rightOpen: boolean;
}

export const MatchHighlight = styled.mark<MatchHighlightProps>`
  background: ${({ theme }) => theme.palette.warning.light};
  color: inherit;
  padding: 2px 0;

  ${({ leftOpen }) =>
    leftOpen &&
    css`
      padding-left: 2px;
      margin-left: -2px;
    `}

  ${({ rightOpen }) =>
    rightOpen &&
    css`
      padding-right: 2px;
      margin-right: -2px;
    `}
`;
