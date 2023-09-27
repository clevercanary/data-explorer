import { IconButtonProps as MIconButtonProps } from "@mui/material";
import React, { CSSProperties, ElementType, forwardRef } from "react";
import { ANCHOR_TARGET } from "../../Links/common/entities";
import { IconName } from "../CustomIcon/common/iconSvgPathShapes";
import { CustomIcon } from "../CustomIcon/customIcon";
import { IconButtonSocials } from "../IconButton/iconButton.styles";
import { Socials as IconButtons } from "./socials.styles";

export const SOCIAL: Record<string, Omit<Social, "url">> = {
  DISCOURSE: { label: "Discourse", type: "discourse" },
  GITHUB: { label: "GitHub", type: "github" },
  SLACK: { label: "Slack", type: "slack" },
  TWITTER: { label: "Twitter", type: "twitter" },
  YOUTUBE: { label: "YouTube", type: "youtube" },
};

export interface Social {
  label: string;
  type: IconName;
  url: string;
}

export interface SocialsProps {
  buttonSize?: MIconButtonProps["size"];
  className?: string;
  IconButtonElType?: ElementType;
  socials: Social[];
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

export const Socials = forwardRef<HTMLDivElement, SocialsProps>(
  function Socials(
    {
      buttonSize = "medium",
      className,
      IconButtonElType = IconButtonSocials,
      socials,
      style,
    }: SocialsProps,
    ref
  ): JSX.Element {
    return (
      <IconButtons className={className} ref={ref} style={style}>
        {socials.map(({ type, url }) => (
          <IconButtonElType
            key={type}
            href={url}
            rel="noopener"
            size={buttonSize}
            target={ANCHOR_TARGET.BLANK}
          >
            <CustomIcon fontSize="small" iconName={type} />
          </IconButtonElType>
        ))}
      </IconButtons>
    );
  }
);
