import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { textBodySmall4002Lines } from "../../styles/common/mixins/fonts";
import { TABLET } from "../../theme/common/breakpoints";
import { ThemeProps } from "../../theme/theme";
import { SectionContent as MDXSectionContent } from "../common/MDXMarkdown/components/Section/mdxSection.styles";
import {
  SectionActions as DXSectionActions,
  sectionMarginXsm,
} from "../common/Section/section.styles";

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

export const SectionForm = styled.div`
  min-height: 40px; // Minimum height prevents section from collapsing while form is loading.
`;

export const SectionActions = styled(DXSectionActions)`
  ${sectionMargin}
`;

export const SectionFootnote = styled.div`
  ${sectionMargin}
  ${textBodySmall4002Lines}
  color: ${({ theme }) => theme.palette.ink.light};
`;
