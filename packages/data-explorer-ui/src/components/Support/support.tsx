import React from "react";
import { SupportConfig } from "../../config/entities";
import { ComponentCreator } from "../ComponentCreator/ComponentCreator";
import { ViewSupport } from "./components/ViewSupport/viewSupport";

/**
 * Support button component.
 */

export interface SupportProps {
  supportRequest?: SupportConfig["supportRequest"];
  url?: string;
}

export const Support = ({ supportRequest, url }: SupportProps): JSX.Element => {
  return (
    <>
      {url && <ViewSupport url={url} />}
      {supportRequest && (
        <ComponentCreator
          components={supportRequest.components}
          response={{}}
        />
      )}
    </>
  );
};
