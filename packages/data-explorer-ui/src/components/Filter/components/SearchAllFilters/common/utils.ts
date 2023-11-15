/**
 * Sets body element overflow style.
 * @param bodyEl - Body element.
 * @param overflowStyle - Overflow style value.
 */
export function setBodyOverflowStyle(
  bodyEl: HTMLBodyElement | null,
  overflowStyle: string
): void {
  if (bodyEl) bodyEl.style.overflow = overflowStyle;
}
