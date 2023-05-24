import { CardActionArea as MCardActionArea } from "@mui/material";
import React, { ReactNode } from "react";

export type CardFn = () => void;

export interface CardActionAreaProps {
  cardFn?: CardFn;
  children: ReactNode;
}

export const CardActionArea = ({
  cardFn,
  children,
}: CardActionAreaProps): JSX.Element => {
  return (
    <MCardActionArea onClick={(): void => cardFn && cardFn()}>
      {children}
    </MCardActionArea>
  );
};
