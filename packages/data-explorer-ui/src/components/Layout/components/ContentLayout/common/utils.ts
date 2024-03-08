import {
  smokeLight,
  smokeLightest,
  white,
} from "../../../../../styles/common/mixins/colors";
import { ThemeProps } from "../../../../../theme/theme";
import { LAYOUT_STYLE } from "../contentLayout";
import { LayoutProps, NavigationProps } from "../contentLayout.styles";

/**
 * Returns layout background color.
 * @param props - Styled layout props, with theme props.
 * @returns background color.
 */
export function getLayoutBackgroundColor(
  props: LayoutProps & ThemeProps
): string | undefined {
  const { layoutStyle } = props;
  if (
    layoutStyle === LAYOUT_STYLE.CONTRAST_LIGHTEST ||
    layoutStyle === LAYOUT_STYLE.CONTRAST
  ) {
    return white(props);
  }
  if (layoutStyle === LAYOUT_STYLE.DEFAULT_LIGHTEST) {
    return smokeLightest(props);
  }
  return smokeLight(props);
}

/**
 * Returns maximum height for navigation and outline grids.
 * @param props - Styled navigation props.
 * @returns maximum height.
 */
export function getNavigationMaxHeight(props: NavigationProps): string {
  const { headerHeight } = props;
  return `calc(100vh - ${headerHeight}px)`;
}

/**
 * Returns top position for navigation and outline grids.
 * @param props - Styled navigation props.
 * @returns top position.
 */
export function getNavigationTop(props: NavigationProps): string {
  const { headerHeight } = props;
  return `${headerHeight}px`;
}

/**
 * Returns navigation background color.
 * @param props - Styled layout props, with theme props.
 * @returns background color.
 */
export function getNavigationBackgroundColor(
  props: LayoutProps & ThemeProps
): string | undefined {
  const { layoutStyle } = props;
  if (
    layoutStyle === LAYOUT_STYLE.CONTRAST_LIGHTEST ||
    layoutStyle === LAYOUT_STYLE.DEFAULT_LIGHTEST
  ) {
    return smokeLightest(props);
  }
  return smokeLight(props);
}
