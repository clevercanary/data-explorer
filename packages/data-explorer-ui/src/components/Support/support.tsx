import React from "react";
import { ViewSupport } from "./components/ViewSupport/viewSupport";

/**
 * Support button component.
 */

export interface SupportProps {
  url?: string;
}

export const Support = ({ url }: SupportProps): JSX.Element => {
  return <>{url ? <ViewSupport url={url} /> : null}</>;
};
