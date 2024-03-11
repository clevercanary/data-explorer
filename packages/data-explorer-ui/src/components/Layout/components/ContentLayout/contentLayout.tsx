import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { useLayoutState } from "../../../../hooks/useLayoutState";
import { PanelBackgroundColor } from "./common/entities";
import {
  Content,
  ContentGrid,
  ContentLayout as Layout,
  Navigation as NavigationPositioner,
  NavigationGrid,
  Outline as OutlinePositioner,
  OutlineGrid,
} from "./contentLayout.styles";

export interface ContentLayoutPanelColor {
  content?: PanelBackgroundColor;
  navigation?: PanelBackgroundColor;
  outline?: PanelBackgroundColor;
}

export interface ContentLayoutProps {
  className?: string;
  content: ReactNode;
  navigation?: ReactNode;
  outline?: ReactNode;
  panelColor?: ContentLayoutPanelColor;
}

export const ContentLayout = ({
  className,
  content,
  navigation,
  outline,
  panelColor,
}: ContentLayoutProps): JSX.Element => {
  const { asPath } = useRouter();
  const {
    layoutState: { headerHeight },
  } = useLayoutState();
  return (
    <Layout className={className} panelColor={panelColor?.content}>
      {navigation && (
        <NavigationGrid
          headerHeight={headerHeight}
          panelColor={panelColor?.navigation}
        >
          <NavigationPositioner>{navigation}</NavigationPositioner>
        </NavigationGrid>
      )}
      <ContentGrid headerHeight={headerHeight} panelColor={panelColor?.content}>
        <Content>{content}</Content>
      </ContentGrid>
      {outline && (
        <OutlineGrid
          key={getOutlineKey(asPath)}
          headerHeight={headerHeight}
          panelColor={panelColor?.outline}
        >
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
