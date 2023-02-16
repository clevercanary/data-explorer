import { Social } from "../../../common/Socials/socials";
import { LogoProps } from "./components/Logo/logo";
import { NavAlignment, NavLinkItem } from "./components/NavLinks/navLinks";

export interface HeaderProps {
  authenticationEnabled?: boolean;
  logo: LogoProps;
  navAlignment?: NavAlignment;
  navLinks: NavLinkItem[];
  searchEnabled?: boolean;
  slogan?: string;
  socials: Social[];
}
