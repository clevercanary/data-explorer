import styled from "@emotion/styled";
import { textBody500 } from "../../../styles/common/mixins/fonts";
import { fontFamily } from "../../../theme/common/typography";

interface CodeBlockProps {
  copied?: boolean;
}

export const CodeBlock = styled("pre")<CodeBlockProps>`
  background: ${({ theme }) => theme.palette.info.lightest};
  border-radius: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(4)};
  position: relative;
  user-select: none;

  &:hover::after {
    opacity: 1;
  }

  &::after {
    ${textBody500};
    font-family: ${fontFamily};
    align-items: center;
    background: ${({ copied }) =>
      copied ? "rgba(28, 124, 199)" : "rgba(28, 124, 199, 0.9)"};
    border-radius: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.palette.common.white};
    content: ${({ copied }) => (copied ? "'Copied'" : "'Copy to clipboard'")};
    display: flex;
    inset: 0;
    justify-content: center;
    position: absolute;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.duration.standard}ms;
  }
`;
