import React, { ReactNode } from "react";
import { useLayoutState } from "../../../../hooks/useLayoutState";
import {
  Content,
  ContentGrid,
  ContentLayout as Layout,
  Navigation as NavigationPositioner,
  NavigationGrid,
  Outline as OutlinePositioner,
  OutlineGrid,
} from "./contentLayout.styles";

/**
 * Possible set of layout style values.
 */
export enum LAYOUT_STYLE {
  CONTRAST = "CONTRAST",
  DEFAULT = "DEFAULT",
}

/**
 * Model of layout style.
 */
export type LayoutStyle = keyof typeof LAYOUT_STYLE;

export interface ContentLayoutProps {
  className?: string;
  content: ReactNode;
  layoutStyle?: LayoutStyle;
  navigation?: ReactNode;
  outline?: ReactNode;
}

export const ContentLayout = ({
  className,
  content,
  layoutStyle,
  navigation,
  outline,
}: ContentLayoutProps): JSX.Element => {
  const {
    layoutState: { headerHeight },
  } = useLayoutState();
  return (
    <Layout className={className} layoutStyle={layoutStyle}>
      {navigation && (
        <NavigationGrid>
          <NavigationPositioner>{navigation}</NavigationPositioner>
        </NavigationGrid>
      )}
      <ContentGrid>
        <Content>{content}</Content>
      </ContentGrid>
      {outline && (
        <OutlineGrid headerHeight={headerHeight}>
          <OutlinePositioner>{outline}</OutlinePositioner>
        </OutlineGrid>
      )}
    </Layout>
  );
};
