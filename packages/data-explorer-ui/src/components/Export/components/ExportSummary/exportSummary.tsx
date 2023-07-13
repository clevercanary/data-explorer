import React from "react";
import {
  FileFacet,
  FileSummary,
} from "../../../../hooks/useFileManifest/common/entities";
import { FileManifest } from "../../../../hooks/useFileManifest/useFileManifest";
import { SectionTitle } from "../../../common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "../../../common/Section/section.styles";
import { Loading, LOADING_PANEL_STYLE } from "../../../Loading/loading";
import { Label, Values } from "../ExportEntity/exportEntity.styles";

export type Summary = [string, string];

export type GetExportSummaryFn = (
  filesFacets: FileFacet[],
  summary: FileSummary
) => Summary[];
export type UseExportSummary = () => FileManifest;

export interface ExportSummaryProps {
  getExportSummary: GetExportSummaryFn;
  useExportSummary: UseExportSummary;
}

export const ExportSummary = ({
  getExportSummary,
  useExportSummary,
}: ExportSummaryProps): JSX.Element => {
  const { filesFacets, fileSummary, isLoading } = useExportSummary();
  const summaries = getExportSummary(filesFacets, fileSummary);
  return (
    <GridPaperSection>
      <Loading loading={isLoading} panelStyle={LOADING_PANEL_STYLE.INHERIT} />
      <SectionTitle title="Selected Data Summary" />
      {summaries.length > 0 ? (
        summaries.map(([label, value]) => (
          <div key={label}>
            <Label>{label}</Label>
            <Values>{value}</Values>
          </div>
        ))
      ) : (
        <Values>None</Values>
      )}
    </GridPaperSection>
  );
};
