import React, { ReactNode } from "react";
import {
  ContentLayout,
  LayoutStyle,
} from "../../components/Layout/components/ContentLayout/contentLayout";

export interface ContentViewProps {
  content: ReactNode;
  layoutStyle?: LayoutStyle;
  navigation?: ReactNode;
  outline?: ReactNode;
}

export const ContentView = ({
  content,
  layoutStyle,
  navigation,
  outline,
}: ContentViewProps): JSX.Element => {
  return (
    <ContentLayout
      content={content}
      layoutStyle={layoutStyle}
      navigation={navigation}
      outline={outline}
    />
  );
};
