import React from "react";
import { ContactSupportIcon } from "../../../common/CustomIcon/components/ContactSupportIcon/contactSupportIcon";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import { Fab } from "./viewSupport.styles";

/**
 * View support button component.
 * Button navigates to new tab with the URL provided.
 */

export interface ViewSupportProps {
  url: string;
}

export const ViewSupport = ({ url }: ViewSupportProps): JSX.Element => {
  return (
    <Fab href={url} target={ANCHOR_TARGET.BLANK}>
      <ContactSupportIcon fontSize="inherit" />
    </Fab>
  );
};
