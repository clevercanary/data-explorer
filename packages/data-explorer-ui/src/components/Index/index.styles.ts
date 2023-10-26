import styled from "@emotion/styled";
import { mediaTabletUp } from "../../styles/common/mixins/breakpoints";

export const Index = styled.div`
  display: grid;
  flex: 1;
  gap: 16px;
  padding: 24px 0;

  ${mediaTabletUp} {
    padding: 24px;
  }
`;
