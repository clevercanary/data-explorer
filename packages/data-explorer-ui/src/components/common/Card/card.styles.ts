import styled from "@emotion/styled";
import { TABLET } from "../../../theme/common/breakpoints";
import { SectionContent } from "../Section/section.styles";

export const CardSection = styled.div`
  display: grid;
  gap: 16px;
  padding: 20px 16px;

  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    padding: 20px;
  }

  .MuiCardMedia-root {
    grid-column: 2; // Card media positioned into the second column.
  }
`;

export const CardContent = styled(SectionContent)``;
