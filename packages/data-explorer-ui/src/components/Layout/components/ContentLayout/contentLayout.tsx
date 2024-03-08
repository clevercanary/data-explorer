import { useRouter } from "next/router";
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
  CONTRAST_LIGHTEST = "CONTRAST_LIGHTEST",
  DEFAULT = "DEFAULT",
  DEFAULT_LIGHTEST = "DEFAULT_LIGHTEST",
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
  const { asPath } = useRouter();
  const {
    layoutState: { headerHeight },
  } = useLayoutState();
  return (
    <Layout className={className} layoutStyle={layoutStyle}>
      {navigation && (
        <NavigationGrid headerHeight={headerHeight} layoutStyle={layoutStyle}>
          <NavigationPositioner>{navigation}</NavigationPositioner>
        </NavigationGrid>
      )}
      <ContentGrid>
        <Content>{content}</Content>
      </ContentGrid>
      {outline && (
        <OutlineGrid key={getOutlineKey(asPath)} headerHeight={headerHeight}>
          <OutlinePositioner>{outline}</OutlinePositioner>
        </OutlineGrid>
      )}
    </Layout>
  );
};

/**
 * Returns outline key.
 * Facilitates re-rendering of outline when path changes, prevents stale active outline tab on navigation.
 * @param asPath - Current path.
 * @returns key for outline.
 */
function getOutlineKey(asPath: string): string {
  return asPath.split("#")[0] || "";
}
