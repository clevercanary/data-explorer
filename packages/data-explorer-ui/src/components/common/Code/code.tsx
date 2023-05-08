import React from "react";
import { CodeBlock } from "./code.styles";

/**
 * Block of code.
 */

export interface CodeProps {
  code: string;
}

export const Code = ({ code }: CodeProps): JSX.Element => {
  return (
    <CodeBlock>
      <code>{code}</code>
    </CodeBlock>
  );
};
