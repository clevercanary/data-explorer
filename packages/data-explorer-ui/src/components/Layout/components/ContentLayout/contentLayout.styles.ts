import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  media1366Up,
  mediaDesktopSmallUp,
  mediaTabletDown,
} from "../../../../styles/common/mixins/breakpoints";
import {
  smokeLight,
  smokeLightest,
  smokeMain,
  white,
} from "../../../../styles/common/mixins/colors";
import { LayoutStyle, LAYOUT_STYLE } from "./contentLayout";

const CONTENT_MAX_WIDTH = 756;
const NAV_GRID_WIDTH = 280;
const NAV_MAX_WIDTH = 232;
const PADDING = 24;
const PADDING_Y = PADDING;

interface LayoutProps {
  layoutStyle?: LayoutStyle;
}

interface NavigationProps {
  headerHeight: number;
  layoutStyle?: LayoutStyle;
}

export const ContentLayout = styled.div<LayoutProps>`
  background-color: ${smokeLight};
  display: grid;
  flex: 1;
  grid-template-areas: "content";
  grid-template-columns: 1fr;
  height: 100%;
  margin: 0 auto;

  ${mediaDesktopSmallUp} {
    grid-template-areas: "navigation content";
    grid-template-columns:
      ${NAV_GRID_WIDTH}px
      1fr;
  }

  ${media1366Up} {
    grid-template-areas: "navigation content outline";
    grid-template-columns:
      ${NAV_GRID_WIDTH}px
      1fr
      ${NAV_GRID_WIDTH}px;
  }

  // Contrast layout style.
  ${({ layoutStyle, theme }) =>
    layoutStyle === LAYOUT_STYLE.CONTRAST &&
    css`
      background-color: ${white({ theme })};
    `};

  // Contrast lightest layout style.
  ${({ layoutStyle, theme }) =>
    layoutStyle === LAYOUT_STYLE.CONTRAST_LIGHTEST &&
    css`
      background-color: ${white({ theme })};
    `};

  // Default lightest layout style.
  ${({ layoutStyle, theme }) =>
    layoutStyle === LAYOUT_STYLE.DEFAULT_LIGHTEST &&
    css`
      background-color: ${smokeLightest({ theme })};
    `};
`;

const navigation = ({ headerHeight }: NavigationProps) => css`
  max-height: calc(100vh - ${headerHeight}px);
  overflow: auto;
  position: sticky;
  top: ${headerHeight}px;
`;

export const NavigationGrid = styled.div<NavigationProps>`
  ${navigation};
  background-color: ${smokeLight};
  box-shadow: inset -1px 0 ${smokeMain};
  display: none;
  grid-area: navigation;

  ${mediaDesktopSmallUp} {
    display: block;
  }

  // Contrast lightest layout style.
  ${({ layoutStyle, theme }) =>
    layoutStyle === LAYOUT_STYLE.CONTRAST_LIGHTEST &&
    css`
      background-color: ${smokeLightest({ theme })};
    `};

  // Default lightest layout style.
  ${({ layoutStyle, theme }) =>
    layoutStyle === LAYOUT_STYLE.DEFAULT_LIGHTEST &&
    css`
      background-color: ${smokeLightest({ theme })};
    `};
`;

export const ContentGrid = styled.div`
  grid-area: content;
`;

export const OutlineGrid = styled("div")<NavigationProps>`
  ${navigation};
  display: none;
  grid-area: outline;

  ${media1366Up} {
    display: block;
  }
`;

export const Navigation = styled.div`
  box-sizing: content-box;
  margin-left: auto;
  max-width: ${NAV_MAX_WIDTH}px;
  padding: ${PADDING}px;
`;

export const Content = styled.div`
  align-self: center;
  box-sizing: content-box;
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH}px;
  padding: ${PADDING_Y}px 40px;

  ${mediaTabletDown} {
    padding: ${PADDING_Y}px 16px;
  }
`;

export const Outline = styled.div`
  box-sizing: content-box;
  margin-right: auto;
  max-width: 242px;
  padding: ${PADDING_Y}px 0;
`;
