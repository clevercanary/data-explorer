import styled from "@emotion/styled";
import { Section } from "../common/Section/section.styles";

export const Error = styled.div`
  margin: 0 auto;
  max-width: 608px;
  padding: 20px 0;
  width: 100%;
`;

export const ErrorSection = styled(Section)`
  align-items: center;
`;

export const SectionContent = styled.div`
  text-align: center;
`;

export const ErrorDetailsWrapper = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 24px;

  & > hr {
    margin: 16px 0 8px 0;
  }
`;

export const ErrorDetailSectionContent = styled(ErrorSection)`
  font-family: "Roboto Mono", monospace;
  font-size: 12px;
  max-width: 608px;
  word-break: normal;
  overflow-wrap: anywhere;
`;
