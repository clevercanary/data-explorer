import styled from "@emotion/styled";
import {
  mediaDesktopSmallDown,
  mediaTabletDown,
} from "../../../../styles/common/mixins/breakpoints";
import {
  smokeLight,
  smokeMain,
  white,
} from "../../../../styles/common/mixins/colors";
import { LayoutStyle, LAYOUT_STYLE } from "./contentLayout";

const CONTENT_GRID_WIDTH = 734;
const NAV_MAX_WIDTH = 232;
const PADDING = 24;
const PADDING_X = PADDING;
const PADDING_Y = PADDING;

interface LayoutProps {
  layoutStyle?: LayoutStyle;
}

interface OutlineProps {
  headerHeight: number;
}

export const ContentLayout = styled.div<LayoutProps>`
  background-color: ${({ layoutStyle }) =>
    layoutStyle === LAYOUT_STYLE.CONTRAST ? white : smokeLight};
  display: grid;
  flex: 1;
  grid-template-areas: "navigation content outline";
  grid-template-columns:
    minmax(360px, auto) minmax(auto, ${CONTENT_GRID_WIDTH}px)
    minmax(346px, auto);
  height: 100%;
  margin: 0 auto;

  ${mediaDesktopSmallDown} {
    grid-template-areas: "navigation content";
    grid-template-columns: ${NAV_MAX_WIDTH + PADDING_X * 2}px fit-content(
        ${CONTENT_GRID_WIDTH}px
      );
  }

  ${mediaTabletDown} {
    grid-template-areas: "content";
    grid-template-columns: 1fr;
  }
`;

export const NavigationGrid = styled.div`
  background-color: ${smokeLight};
  box-shadow: inset -1px 0 ${smokeMain};
  grid-area: navigation;

  ${mediaTabletDown} {
    display: none;
  }
`;

export const ContentGrid = styled.div`
  grid-area: content;
`;

export const OutlineGrid = styled("div")<OutlineProps>`
  grid-area: outline;
  max-height: ${({ headerHeight }) => `calc(100vh - ${headerHeight}px)`};
  overflow: auto;
  position: sticky;
  top: ${({ headerHeight }) => headerHeight}px;

  ${mediaDesktopSmallDown} {
    display: none;
  }
`;

export const Navigation = styled.div`
  box-sizing: content-box;
  margin-left: auto;
  max-width: ${NAV_MAX_WIDTH}px;
  padding: ${PADDING}px;
`;

export const Content = styled.div`
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
