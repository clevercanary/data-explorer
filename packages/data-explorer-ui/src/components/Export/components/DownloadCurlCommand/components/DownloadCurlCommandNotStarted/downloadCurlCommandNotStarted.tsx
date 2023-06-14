import React, { ElementType } from "react";
import { PAPER_PANEL_STYLE } from "../../../../../common/Paper/paper";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import { Loading } from "../../../../../Loading/loading";
import {
  Section,
  SectionActions,
  SectionContent,
  SectionFootnote,
} from "../../../../export.styles";
import { ExportToTerraRunFn } from "../../../ExportToTerra/components/ExportToTerraNotStarted/exportToTerraNotStarted";
import { Button } from "./downloadCurlCommandNotStarted.styles";

export interface DownloadCurlCommandNotStartedProps {
  DownloadCurlForm: ElementType;
  DownloadCurlStart: ElementType;
  isLoading: boolean;
  run: ExportToTerraRunFn;
}

export const DownloadCurlCommandNotStarted = ({
  DownloadCurlForm,
  DownloadCurlStart,
  isLoading,
  run,
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
          <DownloadCurlForm />
          <SectionActions>
            <Button onClick={run}>
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
