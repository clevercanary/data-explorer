import { Popper, PopperProps } from "@mui/material";
import React, { useEffect } from "react";

export const AutocompletePopper = ({ ...props }: PopperProps): JSX.Element => {
  const { open } = props;

  // Sets body overflow style; prevents body scrolling when autocomplete is open.
  useEffect(() => {
    const body = document.querySelector("body");
    setBodyOverflowStyle(body, open ? "hidden" : "");
  }, [open]);

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
