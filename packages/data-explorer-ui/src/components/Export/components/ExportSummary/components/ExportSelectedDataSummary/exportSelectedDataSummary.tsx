import React from "react";
import { AzulSummaryResponse } from "../../../../../../apis/azul/common/entities";
import { FileFacet } from "../../../../../../hooks/useFileManifest/common/entities";
import { useFileManifestState } from "../../../../../../hooks/useFileManifestState";
import { SectionTitle } from "../../../../../common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "../../../../../common/Section/section.styles";
import { Loading, LOADING_PANEL_STYLE } from "../../../../../Loading/loading";
import { Label, Values } from "../../exportSummary.styles";

export type Summary = [string, string];

export type GetExportSummaryFn = (
  filesFacets: FileFacet[],
  summary?: AzulSummaryResponse
) => Summary[];

export interface ExportSelectedDataSummaryProps {
  getExportSelectedDataSummary: GetExportSummaryFn;
}

export const ExportSelectedDataSummary = ({
  getExportSelectedDataSummary,
}: ExportSelectedDataSummaryProps): JSX.Element => {
  const { filesFacets, isLoading, summary } = useFileManifestState();
  const summaries = getExportSelectedDataSummary(filesFacets, summary);
  return (
    <GridPaperSection>
      <Loading loading={isLoading} panelStyle={LOADING_PANEL_STYLE.INHERIT} />
      <SectionTitle title="Selected Data Summary" />
      {summaries.map(([label, value]) => (
        <div key={label}>
          <Label>{label}</Label>
          <Values>{value}</Values>
        </div>
      ))}
    </GridPaperSection>
  );
};
