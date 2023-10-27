import { SvgIcon } from "@mui/material";
import React from "react";
import { CustomSVGIconProps } from "../../common/entities";

/**
 * Custom unfold more icon.
 */

export const UnfoldMoreIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M6.1686 6.24453C6.0186 6.09453 5.9436 5.91303 5.9436 5.70003C5.9436 5.48763 6.0186 5.30643 6.1686 5.15643L8.4375 2.88753C8.5251 2.79993 8.6157 2.73753 8.7093 2.70033C8.8029 2.66313 8.8998 2.64453 9 2.64453C9.1002 2.64453 9.2001 2.66313 9.2997 2.70033C9.3999 2.73753 9.4875 2.79993 9.5625 2.88753L11.8314 5.15643C11.9814 5.30643 12.0564 5.48763 12.0564 5.70003C12.0564 5.91303 11.9814 6.09453 11.8314 6.24453C11.6814 6.39453 11.5002 6.46953 11.2878 6.46953C11.0754 6.46953 10.8942 6.39453 10.7442 6.24453L9 4.50033L7.2558 6.24453C7.1058 6.39453 6.9246 6.46953 6.7122 6.46953C6.4998 6.46953 6.3186 6.39453 6.1686 6.24453ZM9 15.4317C8.8998 15.4317 8.8029 15.4098 8.7093 15.366C8.6157 15.3222 8.5251 15.2628 8.4375 15.1878L6.1686 12.9189C6.0186 12.7689 5.9436 12.5877 5.9436 12.3753C5.9436 12.1629 6.0186 11.9817 6.1686 11.8317C6.3186 11.6817 6.4998 11.6067 6.7122 11.6067C6.9246 11.6067 7.1058 11.6817 7.2558 11.8317L9 13.575L10.7442 11.8317C10.8942 11.6817 11.0754 11.6067 11.2878 11.6067C11.5002 11.6067 11.6814 11.6817 11.8314 11.8317C11.9814 11.9817 12.0564 12.1629 12.0564 12.3753C12.0564 12.5877 11.9814 12.7689 11.8314 12.9189L9.5625 15.1878C9.4875 15.2628 9.3999 15.3222 9.2997 15.366C9.2001 15.4098 9.1002 15.4317 9 15.4317Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
