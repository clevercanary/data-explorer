import styled from "@emotion/styled";

export const CodeBlock = styled("pre")`
  background: ${({ theme }) => theme.palette.info.lightest};
  border-radius: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(4)};
`;
