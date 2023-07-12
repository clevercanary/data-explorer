import React from "react";
import {
  FetchFilesFacets,
  FetchFileSummary,
  FileFacet,
  FileSummary,
} from "../../../../hooks/useFileManifest/common/entities";
import { SectionTitle } from "../../../common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "../../../common/Section/section.styles";
import { Loading, LOADING_PANEL_STYLE } from "../../../Loading/loading";
import { Label, Values } from "../ExportEntity/exportEntity.styles";

export type Summary = [string, string];

export type GetExportSummaryFn = (
  filesFacets: FileFacet[],
  summary: FileSummary
) => Summary[];
export type UseFetchFileFacets = () => FetchFilesFacets;
export type UseFetchSummary = () => FetchFileSummary;

export interface ExportSummaryProps {
  getExportSummary: GetExportSummaryFn;
  useFetchFileFacets: UseFetchFileFacets;
  useFetchSummary: UseFetchSummary;
}

export const ExportSummary = ({
  getExportSummary,
  useFetchFileFacets,
  useFetchSummary,
}: ExportSummaryProps): JSX.Element => {
  const { filesFacets, isLoading: isFacetsLoading } = useFetchFileFacets();
  const { fileSummary, isLoading: isSummaryLoading } = useFetchSummary();
  const summaries = getExportSummary(filesFacets, fileSummary);
  return (
    <GridPaperSection>
      <Loading
        loading={isFacetsLoading || isSummaryLoading}
        panelStyle={LOADING_PANEL_STYLE.INHERIT}
      />
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
