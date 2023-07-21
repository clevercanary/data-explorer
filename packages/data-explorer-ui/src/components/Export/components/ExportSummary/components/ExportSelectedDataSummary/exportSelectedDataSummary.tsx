import React from "react";
import { FileManifest } from "../../../../../../hooks/useFileManifest/common/entities";
import { useFileManifestState } from "../../../../../../hooks/useFileManifestState";
import { SectionTitle } from "../../../../../common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "../../../../../common/Section/section.styles";
import { Loading, LOADING_PANEL_STYLE } from "../../../../../Loading/loading";
import { Label, Values } from "../../exportSummary.styles";

export type Summary = [string, string];

export type GetExportSummaryFn = (fileManifest: FileManifest) => Summary[];

export interface ExportSelectedDataSummaryProps {
  getExportSelectedDataSummary: GetExportSummaryFn;
}

export const ExportSelectedDataSummary = ({
  getExportSelectedDataSummary,
}: ExportSelectedDataSummaryProps): JSX.Element => {
  const { fileManifest, isLoading } = useFileManifestState();
  const summaries = getExportSelectedDataSummary(fileManifest);
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
