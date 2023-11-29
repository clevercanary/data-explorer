import { ButtonBase, TableBody, TableCell, TableRow } from "@mui/material";
import copy from "copy-to-clipboard";
import React, { useEffect, useRef } from "react";
import { Filters } from "../../../../../../../../common/entities";
import { useFileManifestSpreadsheet } from "../../../../../../../../hooks/useFileManifest/useFileManifestSpreadsheet";
import { useRequestFileLocation } from "../../../../../../../../hooks/useRequestFileLocation";
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
import { GridTable } from "../../../../../../../Table/common/gridTable.styles";
import {
  SectionTitle,
  TableContainer,
} from "../../manifestDownloadEntity.styles";
import { FileManifestDisabled } from "../FileManifestDisabled/fileManifestDisabled";

export interface FileManifestSpreadsheetProps {
  disabled: boolean;
  filters: Filters;
}

export const FileManifestSpreadsheet = ({
  disabled,
  filters,
}: FileManifestSpreadsheetProps): JSX.Element => {
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const { exists, fileName, fileUrl } =
    useFileManifestSpreadsheet(filters, disabled) || {};
  const { data, isLoading, run } = useRequestFileLocation(fileUrl);
  const spreadsheetURL = data?.location;
  const isInProgress = exists === undefined || isLoading;
  const showLoading = !disabled && isInProgress;

  // Copies metadata spreadsheet.
  const copyMetadataURL = (url: string): void => {
    copy(url);
  };

  // Downloads metadata spreadsheet.
  const downloadMetadataURL = (): void => {
    downloadRef.current?.click();
  };

  // Requests metadata spreadsheet.
  useEffect(() => {
    run();
  }, [fileUrl, run]);

  return (
    <FluidPaper>
      <GridPaper>
        <SectionTitle>Metadata</SectionTitle>
        <TableContainer>
          <Loading
            loading={showLoading}
            panelStyle={LOADING_PANEL_STYLE.INHERIT}
          />
          <GridTable gridTemplateColumns={spreadsheetURL ? "auto 1fr" : "1fr"}>
            <TableBody>
              <TableRow>
                {disabled ? (
                  <FileManifestDisabled />
                ) : isInProgress ? (
                  <TableCell />
                ) : spreadsheetURL ? (
                  <>
                    <TableCell>
                      <ButtonBase
                        download
                        href={spreadsheetURL}
                        ref={downloadRef}
                        sx={{ display: "none" }}
                      />
                      <ButtonGroup
                        Buttons={[
                          <ButtonGroupButton
                            key="download"
                            action="Download metadata spreadsheet"
                            label={<DownloadIconSmall />}
                            onClick={downloadMetadataURL}
                          />,
                          <ButtonGroupButton
                            key="copy"
                            action="Copy metadata spreadsheet"
                            label={<ContentCopyIconSmall />}
                            onClick={(): void =>
                              copyMetadataURL(spreadsheetURL)
                            }
                          />,
                        ]}
                      />
                    </TableCell>
                    <TableCell>{fileName}</TableCell>
                  </>
                ) : (
                  <TableCell>
                    The metadata is not available for this project.
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
