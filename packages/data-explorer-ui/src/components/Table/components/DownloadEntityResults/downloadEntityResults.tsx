import { Row } from "@tanstack/react-table";
import React from "react";
import { ButtonSecondary } from "../../../common/Button/button.styles";
import { FileDownloadButton } from "../../../common/Button/components/FileDownloadButton/fileDownloadButton";
import { DownloadIcon } from "../../../common/CustomIcon/components/DownloadIcon/downloadIcon";
import { generateDownloadBlob } from "../../common/utils";

export interface DownloadEntityResultsProps<T> {
  fileName: string;
  rows: Row<T>[];
}

export const DownloadEntityResults = <T extends object>({
  fileName,
  rows,
}: DownloadEntityResultsProps<T>): JSX.Element => {
  const [fileUrl, setFileUrl] = React.useState<string | undefined>(undefined);

  const onDownload = (): void => {
    const blob = generateDownloadBlob(rows);
    if (blob) {
      setFileUrl(window.URL.createObjectURL(blob));
    }
  };

  return (
    <>
      <ButtonSecondary
        onClick={(): void => onDownload()}
        StartIcon={DownloadIcon}
      >
        Download TSV
      </ButtonSecondary>
      <FileDownloadButton fileName={fileName} fileUrl={fileUrl} />
    </>
  );
};
