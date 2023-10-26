import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";

interface Props {
  disabled: boolean;
}

export const Filters = styled.div<Props>`
  margin: 8px 0;
  padding: 0;

  // Filters are globally "disabled".
  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};

  .MuiDivider-root {
    margin: 8px 0;
  }

  ${mediaDesktopSmallUp} {
    padding: 0 12px 0 16px;
  }
`;
