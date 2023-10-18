import { Toolbar } from "@mui/material";
import React from "react";
import { IconButtonSocialsFooter } from "../../../common/IconButton/iconButton.styles";
import { Social } from "../../../common/Socials/socials";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import {
  Logo,
  LogoProps,
} from "../Header/components/Content/components/Logo/logo";
import { NavLinkItem } from "../Header/components/Content/components/Navigation/navigation";
import { AppBar, Link, Links, Logos, Socials } from "./footer.styles";

export interface FooterProps {
  className?: string;
  logos: LogoProps[];
  navLinks: NavLinkItem[];
  socials: Social[];
}

export const Footer = ({
  className,
  logos,
  navLinks,
  socials,
}: FooterProps): JSX.Element => {
  return (
    <AppBar
      className={className}
      color="inherit"
      component="footer"
      variant="footer"
    >
      <Toolbar variant="dense">
        <Logos>
          {logos.map(({ alt, height, link, src, width }, l) => (
            <Logo
              key={`${link}${l}`}
              alt={alt}
              height={height}
              link={link}
              src={src}
              width={width}
            />
          ))}
        </Logos>
        <Links>
          {navLinks.map(({ label, url }, i) => (
            <Link
              key={`${url}${i}`}
              label={label}
              target={ANCHOR_TARGET.SELF}
              url={url}
            />
          ))}
          <Socials
            buttonSize="small"
            IconButtonElType={IconButtonSocialsFooter}
            socials={socials}
          />
        </Links>
      </Toolbar>
    </AppBar>
  );
};
