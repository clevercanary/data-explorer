import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { TEXT_HEADING_LARGE } from "../../../theme/common/typography";

export type HeroTitle = ReactNode;

export interface TitleProps {
  title: HeroTitle;
}

export const Title = ({
  title,
  ...props /* Spread props to allow for Typography specific props TypographyProps e.g. "gutterBottom" or "noWrap". */
}: TitleProps): JSX.Element => {
  return (
    <>
      {typeof title === "string" ? (
        <Typography
          color="ink.main"
          component="h1"
          variant={TEXT_HEADING_LARGE}
          {...props}
        >
          {title}
        </Typography>
      ) : (
        title
      )}
    </>
  );
};
