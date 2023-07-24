import React, { ReactNode } from "react";
import { useRequestFileManifest } from "../../../../hooks/useFileManifest/useRequestFileManifest";

export interface ExportSelectedDataProps {
  children: ReactNode | ReactNode[];
}

export const ExportSelectedData = ({
  children,
}: ExportSelectedDataProps): JSX.Element => {
  useRequestFileManifest(undefined, undefined);
  return <>{children}</>;
};
