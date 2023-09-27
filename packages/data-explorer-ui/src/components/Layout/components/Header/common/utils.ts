import { CustomIcon } from "../../../../common/CustomIcon/customIcon";
import { Social } from "../../../../common/Socials/socials";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { MenuItem } from "../components/Content/components/Navigation/components/NavigationMenuItems/navigationMenuItems";
import { NavLinkItem } from "../components/Content/components/Navigation/navigation";

/**
 * Returns header navigation links with socials appended with the corresponding label "Follow Us".
 * @param links - Header navigation links.
 * @param socials - Header socials.
 * @returns header navigation links.
 */
export function getHeaderNavigationLinks(
  links: NavLinkItem[],
  socials: Social[]
): NavLinkItem[] {
  const navLinks = [...links];
  if (socials) {
    navLinks.push({
      label: "Follow Us",
      menuItems: getFollowUsMenuItems(socials),
      url: "",
    });
  }
  return navLinks;
}

/**
 * Returns menu items for the "Follow Us" menu.
 * @param socials - Social configuration.
 * @returns a list of social menu items for the "Follow Us" menu.
 */
function getFollowUsMenuItems(socials: Social[]): MenuItem[] {
  return socials.map(({ label, type, url }) => {
    return {
      icon: CustomIcon({ fontSize: "small", iconName: type }),
      label,
      target: ANCHOR_TARGET.BLANK,
      url,
    };
  });
}
