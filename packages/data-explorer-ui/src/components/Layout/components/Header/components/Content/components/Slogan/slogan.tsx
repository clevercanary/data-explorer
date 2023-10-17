import { Typography } from "@mui/material";
import React, { CSSProperties, forwardRef, ReactNode } from "react";
import { TEXT_BODY_400 } from "../../../../../../../../theme/common/typography";
import { Slogan as CatchPhrase } from "./slogan.styles";

export interface SloganProps {
  className?: string;
  slogan: ReactNode;
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

export const Slogan = forwardRef<HTMLDivElement, SloganProps>(function Slogan(
  { className, slogan, style }: SloganProps,
  ref
): JSX.Element {
  return (
    <CatchPhrase ref={ref} style={style}>
      {typeof slogan === "string" ? (
        <Typography className={className} variant={TEXT_BODY_400}>
          {slogan}
        </Typography>
      ) : (
        slogan
      )}
    </CatchPhrase>
  );
});
