import React, { ElementType, useState } from "react";
import { MANIFEST_DOWNLOAD_FORMAT } from "../../../../apis/azul/common/entities";
import { FileManifestAction } from "../../../../hooks/useFileManifest/common/entities";
import { useRequestFileManifest } from "../../../../hooks/useFileManifest/useRequestFileManifest";
import { useFileManifestState } from "../../../../hooks/useFileManifestState";
import {
  FileLocation,
  useRequestFileLocation,
} from "../../../../hooks/useRequestFileLocation";
import {
  BULK_DOWNLOAD_EXECUTION_ENVIRONMENT,
  ExecutionEnvironment,
} from "../../common/entities";
import { FormFacet } from "./components/DownloadCurlCommandForm/downloadCurlCommandForm";
import { DownloadCurlCommandNotStarted } from "./components/DownloadCurlCommandNotStarted/downloadCurlCommandNotStarted";
import { DownloadCurlCommandReady } from "./components/DownloadCurlCommandReady/downloadCurlCommandReady";

interface DownloadCurlCommandProps {
  DownloadCurlForm: ElementType;
  DownloadCurlStart: ElementType;
  DownloadCurlSuccess: ElementType;
  entity?: [string, string]; // [entityIdKey, entityId] (initializes entity bulk download filters).
  fileManifestAction: FileManifestAction;
  formFacets: FormFacet[];
}

export const DownloadCurlCommand = ({
  DownloadCurlForm,
  DownloadCurlStart,
  DownloadCurlSuccess,
  entity,
  fileManifestAction,
  formFacets,
}: DownloadCurlCommandProps): JSX.Element => {
  useRequestFileManifest(
    fileManifestAction,
    MANIFEST_DOWNLOAD_FORMAT.CURL,
    entity
  );
  const [executionEnvironment, setExecutionEnvironment] =
    useState<ExecutionEnvironment>(BULK_DOWNLOAD_EXECUTION_ENVIRONMENT.BASH);
  const { requestURL } = useFileManifestState();
  const { data, isLoading, run } = useRequestFileLocation(requestURL);
  const curlCommand = getBulkDownloadCurlCommand(data, executionEnvironment);
  return curlCommand ? (
    <DownloadCurlCommandReady
      curlCommand={curlCommand}
      DownloadCurlSuccess={DownloadCurlSuccess}
    />
  ) : (
    <DownloadCurlCommandNotStarted
      DownloadCurlForm={DownloadCurlForm}
      DownloadCurlStart={DownloadCurlStart}
      executionEnvironment={executionEnvironment}
      formFacets={formFacets}
      isLoading={isLoading}
      onUpdateExecutionEnvironment={(
        executionEnvironment: ExecutionEnvironment
      ): void => setExecutionEnvironment(executionEnvironment)}
      run={run}
    />
  );
};

/**
 * Returns the download curl command for the generated manifest.
 * @param fileLocation - Request file location.
 * @param executionEnvironment - Execution environment.
 * @returns curl command.
 */
function getBulkDownloadCurlCommand(
  fileLocation?: FileLocation,
  executionEnvironment?: ExecutionEnvironment
): string | undefined {
  const { commandLine } = fileLocation || {};
  if (!commandLine || !executionEnvironment) {
    return;
  }
  return commandLine[executionEnvironment];
}
