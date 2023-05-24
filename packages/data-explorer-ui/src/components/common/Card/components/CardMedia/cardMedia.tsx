import { CardMedia as MCardMedia } from "@mui/material";
import React from "react";
import { StaticImageProps } from "../../../StaticImage/staticImage";

export interface CardMediaProps {
  media: Omit<StaticImageProps, "alt">;
}

export const CardMedia = ({ media }: CardMediaProps): JSX.Element => {
  return (
    <MCardMedia
      image={media.src}
      sx={{ height: media.height, width: media.width }}
    />
  );
};
