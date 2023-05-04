import styled from "@emotion/styled";
import { Section } from "../common/Section/section.styles";

export const Error = styled.div`
  margin: 0 auto;
  max-width: 648px;
  padding: 20px;
  width: 100%;

  hr {
    margin: 32px 0;
  }
`;

export const ErrorSection = styled(Section)`
  align-items: center;
  padding: 0;
`;

export const SectionContent = styled.div`
  text-align: center;
`;

export const ErrorDetailsWrapper = styled(Section)`
  padding: 0;
  text-align: left;
`;

export const ErrorDetailSectionContent = styled(ErrorSection)`
  font-family: "Roboto Mono", monospace;
  font-size: 12px;
  max-width: 608px;
  overflow-wrap: anywhere;
  word-break: normal;
`;
