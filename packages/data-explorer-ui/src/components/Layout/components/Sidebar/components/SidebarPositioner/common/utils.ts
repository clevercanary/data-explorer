import { SIDEBAR_POSITIONER } from "../../../../../../../common/selectors";

/**
 * Returns the header element.
 * @returns header element.
 */
export function getHeaderElement(): HTMLElement | null {
  return document.querySelector("header");
}

/**
 * Returns the sidebar positioner element.
 * @returns sidebar positioner element.
 */
export function getSidebarPositionerElement(): HTMLElement | null {
  return document.getElementById(SIDEBAR_POSITIONER);
}

/**
 * Sets the sidebar position "top" style.
 */
export function setSidebarPositionStyle(): void {
  const headerEl = getHeaderElement();
  const positionerEl = getSidebarPositionerElement();
  if (!headerEl || !positionerEl) return;
  const top = headerEl.getBoundingClientRect().bottom;
  positionerEl.style.setProperty("top", `${top}px`);
  positionerEl.style.setProperty("height", `calc(100vh - ${top}px)`);
}
