import styled from "@emotion/styled";
import { white } from "../../../../../../styles/common/mixins/colors";
import { sectionPadding } from "../../../../../common/Section/section.styles";

export const Section = styled("div")`
  ${sectionPadding};
  background-color: ${white};
  display: grid;
  gap: 16px;
  grid-template-columns: auto 1fr;
`;

export const SectionContent = styled("div")`
  display: grid;
  gap: 4px;
  grid-row: 1;

  .MuiTypography-text-body-400-2lines {
    p {
      margin: 0;
    }
  }
`;

export const SectionStatus = styled("div")`
  align-self: flex-start;
  grid-column: 1;
  grid-row: 1;

  .MuiRadio-root {
    display: flex;
    cursor: inherit;
  }
`;

export const SectionActions = styled("div")`
  grid-column: 2;
`;
