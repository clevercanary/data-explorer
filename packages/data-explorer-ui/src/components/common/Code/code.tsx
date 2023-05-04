import React, { ReactNode } from "react";
import { CodeBlock } from "./code.styles";

/**
 * Block of code.
 */

export interface CodeProps {
  children: ReactNode;
}

export const Code = ({ children }: CodeProps): JSX.Element => {
  return (
    <CodeBlock>
      <code>{children}</code>
    </CodeBlock>
  );
};
