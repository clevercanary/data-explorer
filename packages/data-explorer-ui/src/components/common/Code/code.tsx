import React, { ReactNode } from "react";

/**
 * Block of code.
 */

export interface CodeProps {
  children: ReactNode;
}

export const Code = ({ children }: CodeProps): JSX.Element => {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  );
};
