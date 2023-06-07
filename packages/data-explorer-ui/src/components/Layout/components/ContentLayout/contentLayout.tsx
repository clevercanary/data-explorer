import React, { ReactNode } from "react";
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
  content: ReactNode;
  layoutStyle?: LayoutStyle;
  navigation?: ReactNode;
  outline?: ReactNode;
}

export const ContentLayout = ({
  content,
  layoutStyle,
  navigation,
  outline,
}: ContentLayoutProps): JSX.Element => {
  return (
    <Layout layoutStyle={layoutStyle}>
      {navigation && (
        <NavigationGrid>
          <NavigationPositioner>{navigation}</NavigationPositioner>
        </NavigationGrid>
      )}
      <ContentGrid>
        <Content>{content}</Content>
      </ContentGrid>
      {outline && (
        <OutlineGrid>
          <OutlinePositioner>{outline}</OutlinePositioner>
        </OutlineGrid>
      )}
    </Layout>
  );
};
