import { ButtonBase } from "@mui/material";
import React, { ElementType, useRef } from "react";
import { ButtonPrimary } from "../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import {
  Section,
  SectionActions,
  SectionContent,
} from "../../../../export.styles";
import { Code } from "./manifestDownloadReady.styles";

export interface ManifestDownloadReadyProps {
  ManifestDownloadSuccess: ElementType;
  manifestURL: string;
}

export const ManifestDownloadReady = ({
  ManifestDownloadSuccess,
  manifestURL,
}: ManifestDownloadReadyProps): JSX.Element => {
  const downloadRef = useRef<HTMLAnchorElement>(null);

  // Download file manifest.
  const onDownloadManifest = (): void => {
    downloadRef?.current?.click();
  };

  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          <ManifestDownloadSuccess />
          <Code code={manifestURL} />
        </SectionContent>
        <SectionActions>
          <ButtonPrimary onClick={onDownloadManifest}>
            Download Manifest
          </ButtonPrimary>
          <ButtonBase
            download
            href={manifestURL}
            ref={downloadRef}
            sx={{ display: "none" }}
          />
        </SectionActions>
      </Section>
    </FluidPaper>
  );
};
