import React, { Fragment } from "react";
import { Filters } from "../../../../../../common/entities";
import { FileFacet } from "../../../../../../hooks/useFileManifest/common/entities";
import { useFileManifestState } from "../../../../../../hooks/useFileManifestState";
import { SectionTitle } from "../../../../../common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "../../../../../common/Section/section.styles";
import { Loading, LOADING_PANEL_STYLE } from "../../../../../Loading/loading";
import { Label, Values } from "../../exportSummary.styles";

export type CurrentQuery = [string, string[]];

export type GetExportCurrentQueriesFn = (
  filters: Filters,
  filesFacets: FileFacet[]
) => CurrentQuery[];

export interface ExportCurrentQueryProps {
  getExportCurrentQueries: GetExportCurrentQueriesFn;
}

export const ExportCurrentQuery = ({
  getExportCurrentQueries,
}: ExportCurrentQueryProps): JSX.Element => {
  const { filesFacets, filters, isLoading } = useFileManifestState();
  const queries = getExportCurrentQueries(filters, filesFacets);
  return (
    <GridPaperSection>
      <Loading loading={isLoading} panelStyle={LOADING_PANEL_STYLE.INHERIT} />
      <SectionTitle title="Current Query" />
      {queries.length > 0 ? (
        queries.map(([label, values]) => (
          <div key={label}>
            <Label>{label}</Label>
            <Values>
              {values.map((value, i) => (
                <Fragment key={`${value}${i}`}>
                  {i > 0 && <code>OR</code>}
                  <span>{value}</span>
                </Fragment>
              ))}
            </Values>
          </div>
        ))
      ) : (
        <Values>All Data</Values>
      )}
    </GridPaperSection>
  );
};
