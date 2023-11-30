import React, { ReactNode, useEffect } from "react";
import { SIDEBAR_POSITIONER } from "../../../../../../common/selectors";
import { setSidebarPositionStyle } from "./common/utils";
import { SidebarPositioner as Positioner } from "./sidebarPositioner.styles";

export interface SidebarPositionerProps {
  children: ReactNode | ReactNode[];
}

export const SidebarPositioner = ({
  children,
}: SidebarPositionerProps): JSX.Element => {
  // Sets sidebar position style (css "top" property).
  useEffect(() => {
    setSidebarPositionStyle();
  }, []);
  return <Positioner id={SIDEBAR_POSITIONER}>{children}</Positioner>;
};
