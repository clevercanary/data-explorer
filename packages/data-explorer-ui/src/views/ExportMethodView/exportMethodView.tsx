import React, { ReactNode } from "react";
import { ComponentCreator } from "../../components/ComponentCreator/ComponentCreator";
import { BackPageView } from "../../components/Layout/components/BackPage/backPageView";
import { BackPageHero } from "../../components/Layout/components/BackPage/components/BackPageHero/backPageHero";
import { useExportMethodConfig } from "../../hooks/useExport/useExportMethodConfig";
import { useUpdateURLSearchParams } from "../../hooks/useUpdateURLSearchParams";

export interface DownloadCurlCommandViewProps {
  ExportMethod: ReactNode;
  title: string;
}

export const ExportMethodView = ({
  ExportMethod,
  title,
}: DownloadCurlCommandViewProps): JSX.Element => {
  useUpdateURLSearchParams();
  const { breadcrumbs, sideColumn } = useExportMethodConfig(title);
  return (
    <BackPageView
      mainColumn={ExportMethod}
      sideColumn={
        sideColumn ? (
          <ComponentCreator components={sideColumn} response={{}} />
        ) : undefined
      }
      top={<BackPageHero breadcrumbs={breadcrumbs} title={title} />}
    />
  );
};
