import React, { ElementType } from "react";
import { PAPER_PANEL_STYLE } from "../../../../../common/Paper/paper";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import { Loading } from "../../../../../Loading/loading";
import { ExecutionEnvironment, FormFacet } from "../../../../common/entities";
import {
  Section,
  SectionActions,
  SectionContent,
  SectionFootnote,
} from "../../../../export.styles";
import { OnUpdateExecutionEnvironmentFn } from "../DownloadCurlCommandForm/downloadCurlCommandForm";
import { Button } from "./downloadCurlCommandNotStarted.styles";

export interface DownloadCurlCommandNotStartedProps {
  DownloadCurlForm: ElementType;
  DownloadCurlStart: ElementType;
  executionEnvironment: ExecutionEnvironment;
  formFacets: FormFacet[];
  isLoading: boolean;
  onRequestManifest: () => void;
  onUpdateExecutionEnvironment: OnUpdateExecutionEnvironmentFn;
}

export const DownloadCurlCommandNotStarted = ({
  DownloadCurlForm,
  DownloadCurlStart,
  executionEnvironment,
  formFacets,
  isLoading,
  onRequestManifest,
  onUpdateExecutionEnvironment,
}: DownloadCurlCommandNotStartedProps): JSX.Element => {
  return (
    <div>
      <Loading
        loading={isLoading}
        panelStyle={PAPER_PANEL_STYLE.FLUID}
        text="Your curl command is being prepared..."
      />
      <FluidPaper>
        <Section>
          <SectionContent>
            <DownloadCurlStart />
          </SectionContent>
          <DownloadCurlForm
            executionEnvironment={executionEnvironment}
            formFacets={formFacets}
            onUpdateExecutionEnvironment={onUpdateExecutionEnvironment}
          />
          <SectionActions>
            <Button onClick={onRequestManifest}>
              <span>Request curl Command</span>
            </Button>
          </SectionActions>
          <SectionFootnote>
            The generated curl command is compatible with the Bash shell on Mac
            and Linux systems, and the Command shell on Windows systems, and
            will remain valid for seven days.
          </SectionFootnote>
        </Section>
      </FluidPaper>
    </div>
  );
};
