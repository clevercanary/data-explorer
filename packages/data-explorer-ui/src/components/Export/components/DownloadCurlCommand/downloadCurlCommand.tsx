import React, { ElementType, useState } from "react";
import { MANIFEST_DOWNLOAD_FORMAT } from "../../../../apis/azul/common/entities";
import { useExploreState } from "../../../../hooks/useExploreState";
import {
  FileManifestType,
  FILE_MANIFEST_TYPE,
} from "../../../../hooks/useFileManifest/common/entities";
import { useRequestFileManifest } from "../../../../hooks/useFileManifest/useRequestFileManifest";
import { useFileManifestState } from "../../../../hooks/useFileManifestState";
import {
  FileLocation,
  useRequestFileLocation,
} from "../../../../hooks/useRequestFileLocation";
import {
  BULK_DOWNLOAD_EXECUTION_ENVIRONMENT,
  ExecutionEnvironment,
  FormFacet,
} from "../../common/entities";
import { bulkDownloadTracking } from "../../common/tracking";
import { DownloadCurlCommandNotStarted } from "./components/DownloadCurlCommandNotStarted/downloadCurlCommandNotStarted";
import { DownloadCurlCommandReady } from "./components/DownloadCurlCommandReady/downloadCurlCommandReady";

interface DownloadCurlCommandProps {
  DownloadCurlForm: ElementType;
  DownloadCurlStart: ElementType;
  DownloadCurlSuccess: ElementType;
  entity?: [string, string]; // [entityIdKey, entityId] (initializes entity bulk download filters).
  fileManifestType: FileManifestType;
  formFacets: FormFacet[];
}

export const DownloadCurlCommand = ({
  DownloadCurlForm,
  DownloadCurlStart,
  DownloadCurlSuccess,
  entity,
  fileManifestType,
  formFacets,
}: DownloadCurlCommandProps): JSX.Element => {
  useRequestFileManifest(MANIFEST_DOWNLOAD_FORMAT.CURL, entity);
  const [executionEnvironment, setExecutionEnvironment] =
    useState<ExecutionEnvironment>(BULK_DOWNLOAD_EXECUTION_ENVIRONMENT.BASH);
  const {
    exploreState: { tabValue: entityList },
  } = useExploreState();
  const { requestParams, requestURL } = useFileManifestState();
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
      onRequestManifest={(): void => {
        // Execute GTM tracking.
        track(
          fileManifestType,
          entityList,
          executionEnvironment,
          requestParams
        );
        // Request manifest.
        run();
      }}
      onUpdateExecutionEnvironment={(
        executionEnvironment: ExecutionEnvironment
      ): void => setExecutionEnvironment(executionEnvironment)}
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

/**
 * Executes GTM tracking.
 * @param fileManifestType - File manifest type.
 * @param index - Index.
 * @param toolName - Execution environment.
 * @param requestParams - Request params.
 */
function track(
  fileManifestType: FileManifestType,
  index: string,
  toolName: string,
  requestParams?: URLSearchParams
): void {
  if (fileManifestType === FILE_MANIFEST_TYPE.BULK_DOWNLOAD) {
    bulkDownloadTracking(index, toolName, requestParams);
  }
}
