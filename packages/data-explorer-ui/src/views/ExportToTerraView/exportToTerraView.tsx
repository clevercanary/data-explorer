import React from "react";
import { AzulEntityStaticResponse } from "../../apis/azul/common/entities";
import { ComponentCreator } from "../../components/ComponentCreator/ComponentCreator";
import { BackPageView } from "../../components/Layout/components/BackPage/backPageView";
import { BackPageHero } from "../../components/Layout/components/BackPage/components/BackPageHero/backPageHero";
import { useExportMethodConfig } from "../../hooks/useExport/useExportMethodConfig";
import { useUpdateURLSearchParams } from "../../hooks/useUpdateURLSearchParams";
import { MainColumn } from "./mainColumn";

const TITLE = "Export to Terra";
// TODO deprecated component - use ExportMethodView instead.

export type ExportToTerraViewProps = AzulEntityStaticResponse;

export const ExportToTerraView = (
  props: ExportToTerraViewProps
): JSX.Element => {
  useUpdateURLSearchParams();
  const { breadcrumbs, sideColumn } = useExportMethodConfig(TITLE);
  return (
    <BackPageView
      mainColumn={<MainColumn />}
      sideColumn={
        sideColumn ? (
          <ComponentCreator components={sideColumn} response={props} />
        ) : undefined
      }
      top={<BackPageHero breadcrumbs={breadcrumbs} title={TITLE} />}
    />
  );
};
