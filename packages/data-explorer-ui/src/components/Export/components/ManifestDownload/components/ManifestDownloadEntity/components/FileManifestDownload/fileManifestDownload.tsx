import { ButtonBase, TableBody, TableCell, TableRow } from "@mui/material";
import copy from "copy-to-clipboard";
import React, { useRef } from "react";
import { Filters } from "../../../../../../../../common/entities";
import { useFileManifestDownload } from "../../../../../../../../hooks/useFileManifest/useFileManifestDownload";
import { ButtonGroup } from "../../../../../../../common/ButtonGroup/buttonGroup";
import { ButtonGroupButton } from "../../../../../../../common/ButtonGroup/components/ButtonGroupButton/buttonGroupButton";
import {
  ContentCopyIconSmall,
  DownloadIconSmall,
} from "../../../../../../../common/CustomIcon/common/constants";
import {
  FluidPaper,
  GridPaper,
} from "../../../../../../../common/Paper/paper.styles";
import {
  Loading,
  LOADING_PANEL_STYLE,
} from "../../../../../../../Loading/loading";
import { Table as GridTable } from "../../../../../../../Table/table.styles";
import {
  SectionTitle,
  TableContainer,
} from "../../manifestDownloadEntity.styles";

export interface FileManifestDownloadProps {
  filters: Filters;
}

export const FileManifestDownload = ({
  filters,
}: FileManifestDownloadProps): JSX.Element => {
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const { fileName, isIdle, isLoading, manifestURL } =
    useFileManifestDownload(filters);
  const isInProgress = isIdle || isLoading;

  // Copies file manifest.
  const copyManifestURL = (url: string): void => {
    copy(url);
  };

  // Downloads file manifest.
  const downloadManifestURL = (): void => {
    downloadRef.current?.click();
  };

  return (
    <FluidPaper>
      <GridPaper>
        <SectionTitle>File Manifest</SectionTitle>
        <TableContainer>
          <Loading
            loading={isInProgress}
            panelStyle={LOADING_PANEL_STYLE.INHERIT}
          />
          <GridTable gridTemplateColumns={manifestURL ? "auto 1fr" : "1fr"}>
            <TableBody>
              <TableRow>
                {isInProgress ? (
                  <TableCell />
                ) : manifestURL ? (
                  <>
                    <TableCell>
                      <ButtonBase
                        href={manifestURL}
                        ref={downloadRef}
                        sx={{ display: "none" }}
                      />
                      <ButtonGroup
                        Buttons={[
                          <ButtonGroupButton
                            key="download"
                            action="Download file manifest"
                            label={<DownloadIconSmall />}
                            onClick={downloadManifestURL}
                          />,
                          <ButtonGroupButton
                            key="copy"
                            action="Copy file manifest"
                            label={<ContentCopyIconSmall />}
                            onClick={(): void => copyManifestURL(manifestURL)}
                          />,
                        ]}
                      />
                    </TableCell>
                    <TableCell>{fileName}</TableCell>
                  </>
                ) : (
                  <TableCell>
                    The manifest is not available for this project.
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </GridTable>
        </TableContainer>
      </GridPaper>
    </FluidPaper>
  );
};
