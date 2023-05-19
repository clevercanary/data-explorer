import React, { ReactNode } from "react";
import { ContentLayout } from "../../components/Layout/components/ContentLayout/contentLayout";

export interface ContentViewProps {
  content: ReactNode;
  navigation?: ReactNode;
  outline?: ReactNode;
}

export const ContentView = ({
  content,
  navigation,
  outline,
}: ContentViewProps): JSX.Element => {
  return (
    <ContentLayout
      content={content}
      navigation={navigation}
      outline={outline}
    />
  );
};
