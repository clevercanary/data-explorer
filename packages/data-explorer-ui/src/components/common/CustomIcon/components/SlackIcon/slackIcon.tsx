import { SvgIcon } from "@mui/material";
import React from "react";
import { CustomSVGIconProps } from "../../common/entities";

/**
 * Custom Slack icon (socials).
 */

export const SlackIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M5.3437 10.6877C5.3437 11.3908 4.72495 12.0096 4.02183 12.0096C3.29058 12.0096 2.69995 11.3908 2.69995 10.6877C2.69995 9.95645 3.29058 9.36582 4.02183 9.36582H5.3437V10.6877ZM5.99058 10.6877C5.99058 9.95645 6.60933 9.36582 7.31245 9.36582C8.0437 9.36582 8.63433 9.95645 8.63433 10.6877V13.9783C8.63433 14.7096 8.0437 15.3002 7.31245 15.3002C6.60933 15.3002 5.99058 14.7096 5.99058 13.9783V10.6877ZM7.31245 5.37207C6.60933 5.37207 5.99058 4.75332 5.99058 4.0502C5.99058 3.31895 6.60933 2.7002 7.31245 2.7002C8.0437 2.7002 8.63433 3.31895 8.63433 4.0502V5.37207H7.31245ZM7.31245 6.01895C8.0437 6.01895 8.63433 6.60957 8.63433 7.34082C8.63433 8.07207 8.0437 8.6627 7.31245 8.6627H4.02183C3.29058 8.6627 2.69995 8.07207 2.69995 7.34082C2.69995 6.60957 3.29058 6.01895 4.02183 6.01895H7.31245ZM12.6281 7.34082C12.6281 6.60957 13.2468 6.01895 13.95 6.01895C14.6812 6.01895 15.3 6.60957 15.3 7.34082C15.3 8.07207 14.6812 8.6627 13.95 8.6627H12.6281V7.34082ZM11.9812 7.34082C11.9812 8.07207 11.3906 8.6627 10.6593 8.6627C9.92808 8.6627 9.33745 8.07207 9.33745 7.34082V4.0502C9.33745 3.31895 9.92808 2.7002 10.6593 2.7002C11.3906 2.7002 11.9812 3.31895 11.9812 4.0502V7.34082ZM10.6593 12.6564C11.3906 12.6564 11.9812 13.2752 11.9812 13.9783C11.9812 14.7096 11.3906 15.3002 10.6593 15.3002C9.92808 15.3002 9.33745 14.7096 9.33745 13.9783V12.6564H10.6593ZM10.6593 12.0096C9.92808 12.0096 9.33745 11.3908 9.33745 10.6877C9.33745 9.95645 9.92808 9.36582 10.6593 9.36582H13.95C14.6812 9.36582 15.3 9.95645 15.3 10.6877C15.3 11.3908 14.6812 12.0096 13.95 12.0096H10.6593Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
