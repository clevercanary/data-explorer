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

export interface ContentLayoutProps {
  content: ReactNode;
  navigation?: ReactNode;
  outline?: ReactNode;
}

export const ContentLayout = ({
  content,
  navigation,
  outline,
}: ContentLayoutProps): JSX.Element => {
  return (
    <Layout>
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
