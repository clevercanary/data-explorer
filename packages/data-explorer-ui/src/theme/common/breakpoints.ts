/**
 * Breakpoints
 */
export enum BREAKPOINTS {
  DESKTOP = 1440,
  DESKTOP_SM = 1280,
  MOBILE = 0,
  TABLET = 768,
}

/**
 * Breakpoints constants
 */
export const desktop = BREAKPOINTS.DESKTOP;
export const desktopSm = BREAKPOINTS.DESKTOP_SM;
export const mobile = BREAKPOINTS.MOBILE;
export const tablet = BREAKPOINTS.TABLET;

/**
 * Breakpoints queries
 */
export const desktopUp = `@media (min-width: ${desktop}px)`;
export const desktopSmUp = `@media (min-width: ${desktopSm}px)`;
export const mobileUp = `@media (min-width: ${mobile}px)`;
export const tabletUp = `@media (min-width: ${tablet}px)`;
