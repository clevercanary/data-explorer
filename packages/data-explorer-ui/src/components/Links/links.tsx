import React from "react";
import { Link, LinkProps } from "./components/Link/link";

export interface LinksProps {
  links: LinkProps[];
}

export const Links = ({ links }: LinksProps): JSX.Element => {
  return (
    <>
      {links.map(({ copyable, label, noWrap, target, url }) => (
        <Link
          key={url}
          copyable={copyable}
          label={label}
          noWrap={noWrap}
          target={target}
          url={url}
        />
      ))}
    </>
  );
};
