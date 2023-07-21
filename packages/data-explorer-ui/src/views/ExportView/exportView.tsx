import React from "react";
import { AzulEntityStaticResponse } from "../../apis/azul/common/entities";
import { ComponentCreator } from "../../components/ComponentCreator/ComponentCreator";
import { BackPageView } from "../../components/Layout/components/BackPage/backPageView";
import { useExportConfig } from "../../hooks/useExportConfig";
import { useUpdateURLSearchParams } from "../../hooks/useUpdateURLSearchParams";

export type ExportViewProps = AzulEntityStaticResponse;

export const ExportView = (props: ExportViewProps): JSX.Element => {
  useUpdateURLSearchParams();
  const { tabs, top } = useExportConfig();
  const currentTab = tabs[0];
  const { mainColumn, sideColumn } = currentTab;
  return (
    <BackPageView
      mainColumn={<ComponentCreator components={mainColumn} response={props} />}
      sideColumn={
        sideColumn ? (
          <ComponentCreator components={sideColumn} response={props} />
        ) : undefined
      }
      top={<ComponentCreator components={top} response={props} />}
    />
  );
};
