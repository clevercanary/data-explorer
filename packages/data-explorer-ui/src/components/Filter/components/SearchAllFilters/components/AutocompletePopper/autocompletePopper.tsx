import { PopperProps } from "@mui/material";
import React, { useEffect } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../hooks/useBreakpointHelper";
import { DESKTOP_SM } from "../../../../../../theme/common/breakpoints";
import { Popper } from "./autocompletePopper.styles";

export const AutocompletePopper = ({ ...props }: PopperProps): JSX.Element => {
  const desktopSmDown = useBreakpointHelper(
    BREAKPOINT_FN_NAME.DOWN,
    DESKTOP_SM
  );
  const { open } = props;

  // Sets body overflow style; prevents body scrolling when autocomplete is open.
  useEffect(() => {
    const body = document.querySelector("body");
    const overflowStyle = desktopSmDown ? "hidden" : open ? "hidden" : "";
    setBodyOverflowStyle(body, overflowStyle);
  }, [open, desktopSmDown]);

  return <Popper {...props} />;
};

/**
 * Sets body element overflow style.
 * @param bodyEl - Body element.
 * @param overflowStyle - Overflow style value.
 */
function setBodyOverflowStyle(
  bodyEl: HTMLBodyElement | null,
  overflowStyle: string
): void {
  if (bodyEl) bodyEl.style.overflow = overflowStyle;
}
