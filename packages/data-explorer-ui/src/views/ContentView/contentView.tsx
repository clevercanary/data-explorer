import React, { ReactNode } from "react";
import {
  ContentLayout,
  ContentLayoutPanelColor,
} from "../../components/Layout/components/ContentLayout/contentLayout";

export interface ContentViewProps {
  content: ReactNode;
  navigation?: ReactNode;
  outline?: ReactNode;
  panelColor?: ContentLayoutPanelColor;
}

export const ContentView = ({
  content,
  navigation,
  outline,
  panelColor,
}: ContentViewProps): JSX.Element => {
  return (
    <ContentLayout
      content={content}
      navigation={navigation}
      outline={outline}
      panelColor={panelColor}
    />
  );
};
