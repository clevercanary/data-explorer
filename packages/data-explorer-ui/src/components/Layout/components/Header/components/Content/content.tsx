import React, { ReactNode } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../hooks/useBreakpointHelper";
import { DESKTOP_SM } from "../../../../../../theme/common/breakpoints";
import { HeaderContent } from "./content.styles";

export interface ContentProps {
  children: ReactNode | ReactNode[];
}

export const Content = ({ children }: ContentProps): JSX.Element => {
  const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
  return smDesktop ? (
    <>{children}</>
  ) : (
    <HeaderContent>{children}</HeaderContent>
  );
};
