import React, { ElementType } from "react";

/**
 * Renders a React functional or class component as a React node.
 */

export interface RenderComponentProps {
  Component: ElementType;
}

export const RenderComponent = ({
  Component,
}: RenderComponentProps): JSX.Element => {
  return <Component />;
};
