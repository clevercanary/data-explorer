import React, { ElementType } from "react";
import { MANIFEST_DOWNLOAD_FORMAT } from "../../../../../../apis/azul/common/entities";
import {
  FileLocation,
  useRequestFileLocation,
} from "../../../../../../hooks/useRequestFileLocation";
import {
  UseExportParams,
  UseExportRequestURL,
} from "../../../../common/entities";
import { DownloadCurlCommandNotStarted } from "../DownloadCurlCommandNotStarted/downloadCurlCommandNotStarted";
import { DownloadCurlCommandReady } from "../DownloadCurlCommandReady/downloadCurlCommandReady";

export type UseDownloadCurlCommand = (
  fileLocation?: FileLocation
) => string | undefined;

interface DownloadEntityCurlCommandProps {
  DownloadCurlForm: ElementType;
  DownloadCurlStart: ElementType;
  DownloadCurlSuccess: ElementType;
  useDownloadCurlCommand: UseDownloadCurlCommand;
  useExportParams: UseExportParams;
  useExportRequestURL: UseExportRequestURL;
}

export const DownloadEntityCurlCommand = ({
  DownloadCurlForm,
  DownloadCurlStart,
  DownloadCurlSuccess,
  useDownloadCurlCommand,
  useExportParams,
  useExportRequestURL,
}: DownloadEntityCurlCommandProps): JSX.Element => {
  const requestParams = useExportParams(MANIFEST_DOWNLOAD_FORMAT.CURL);
  const requestURL = useExportRequestURL(requestParams);
  const { data, isLoading, run } = useRequestFileLocation(requestURL);
  const curlCommand = useDownloadCurlCommand(data);
  return curlCommand ? (
    <DownloadCurlCommandReady
      curlCommand={curlCommand}
      DownloadCurlSuccess={DownloadCurlSuccess}
    />
  ) : (
    <DownloadCurlCommandNotStarted
      DownloadCurlForm={DownloadCurlForm}
      DownloadCurlStart={DownloadCurlStart}
      isLoading={isLoading}
      run={run}
    />
  );
};
