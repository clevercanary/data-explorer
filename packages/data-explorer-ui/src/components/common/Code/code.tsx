import copy from "copy-to-clipboard";
import React, { useEffect, useRef, useState } from "react";
import { CodeBlock } from "./code.styles";

/**
 * Block of code.
 */

export interface CodeProps {
  code: string;
}

export const Code = ({ code }: CodeProps): JSX.Element => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // cleanup function
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const onClick = (): void => {
    copy(code);
    setCopied(true);
    timeoutRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <CodeBlock onClick={onClick} copied={copied}>
      <code>{code}</code>
    </CodeBlock>
  );
};
