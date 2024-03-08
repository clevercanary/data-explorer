import { SvgIcon } from "@mui/material";
import React from "react";
import { CustomSVGIconProps } from "../../common/entities";

export const Segment = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M7.50556 13.5117C7.29316 13.5117 7.10896 13.4337 6.95296 13.2777C6.79636 13.1211 6.71806 12.9366 6.71806 12.7242C6.71806 12.5118 6.79636 12.3273 6.95296 12.1707C7.10896 12.0147 7.29316 11.9367 7.50556 11.9367H14.9684C15.1808 11.9367 15.3653 12.0147 15.5219 12.1707C15.6778 12.3273 15.7559 12.5118 15.7559 12.7242C15.7559 12.9366 15.6778 13.1211 15.5219 13.2777C15.3653 13.4337 15.1808 13.5117 14.9684 13.5117H7.50556ZM3.04336 6.08672C2.83096 6.08672 2.64646 6.00872 2.48986 5.85272C2.33386 5.69612 2.25586 5.51162 2.25586 5.29922C2.25586 5.08682 2.33386 4.90232 2.48986 4.74572C2.64646 4.58972 2.83096 4.51172 3.04336 4.51172H14.9684C15.1808 4.51172 15.3653 4.58972 15.5219 4.74572C15.6778 4.90232 15.7559 5.08682 15.7559 5.29922C15.7559 5.51162 15.6778 5.69612 15.5219 5.85272C15.3653 6.00872 15.1808 6.08672 14.9684 6.08672H3.04336ZM7.50556 9.79922C7.29316 9.79922 7.10896 9.72119 6.95296 9.56522C6.79636 9.40862 6.71806 9.22412 6.71806 9.01172C6.71806 8.79932 6.79636 8.61482 6.95296 8.45822C7.10896 8.30222 7.29316 8.22422 7.50556 8.22422H14.9684C15.1808 8.22422 15.3653 8.30222 15.5219 8.45822C15.6778 8.61482 15.7559 8.79932 15.7559 9.01172C15.7559 9.22412 15.6778 9.40862 15.5219 9.56522C15.3653 9.72119 15.1808 9.79922 14.9684 9.79922H7.50556Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
