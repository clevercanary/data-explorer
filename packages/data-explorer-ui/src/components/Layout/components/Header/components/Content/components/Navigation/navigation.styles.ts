import styled from "@emotion/styled";
import { textBody500 } from "../../../../../../../../styles/common/mixins/fonts";

interface Props {
  center: boolean;
}

export const Navigation = styled("div")<Props>`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 8px;
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  margin-left: ${({ center }) => (center ? "unset" : "24px")};

  .MuiButton-nav {
    ${textBody500};
    padding: 6px 12px;

    .MuiButton-endIcon {
      margin-left: -6px;
      margin-right: -6px;
    }
  }
`;
