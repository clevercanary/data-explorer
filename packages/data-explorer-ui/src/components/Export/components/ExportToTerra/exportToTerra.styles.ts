import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TABLET } from "../../../../theme/common/breakpoints";
import { ThemeProps } from "../../../../theme/theme";
import { SectionContent as MDXSectionContent } from "../../../common/MDXMarkdown/components/Section/mdxSection.styles";
import {
  SectionActions as DXSectionActions,
  sectionMarginXsm,
} from "../../../common/Section/section.styles";

export const sectionMargin = ({ theme }: ThemeProps) => css`
  ${sectionMarginXsm}
  ${theme.breakpoints.up(TABLET)} {
    margin: 16px 20px;
  }
`;

export const Section = styled.div`
  margin: 20px 0;
`;

export const SectionContent = styled(MDXSectionContent)`
  ${sectionMargin}
`;

export const SectionActions = styled(DXSectionActions)`
  ${sectionMargin}
`;
