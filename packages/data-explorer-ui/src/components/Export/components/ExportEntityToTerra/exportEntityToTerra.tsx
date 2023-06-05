import React, { ElementType } from "react";
import {
  FileLocation,
  useRequestFileLocation,
} from "../../../../hooks/useRequestFileLocation";
import { ExportToTerraNotStarted } from "../ExportToTerra/components/ExportToTerraNotStarted/exportToTerraNotStarted";
import { ExportToTerraReady } from "../ExportToTerra/components/ExportToTerraReady/exportToTerraReady";

export type UseExportParams = () => URLSearchParams;
export type UseExportRequestURL = (requestParams: URLSearchParams) => string;
export type UseExportResponseURL = (
  requestParams: URLSearchParams,
  fileLocation?: FileLocation
) => string | undefined;

interface ExportEntityToTerraProps {
  ExportForm: ElementType;
  ExportToTerra: ElementType;
  ExportToTerraSuccess: ElementType;
  useExportParams: UseExportParams;
  useExportRequestURL: UseExportRequestURL;
  useExportResponseURL: UseExportResponseURL;
}

export const ExportEntityToTerra = ({
  ExportForm,
  ExportToTerra,
  ExportToTerraSuccess,
  useExportParams,
  useExportRequestURL,
  useExportResponseURL,
}: ExportEntityToTerraProps): JSX.Element => {
  const requestParams = useExportParams();
  const requestURL = useExportRequestURL(requestParams);
  const { data, isLoading, run } = useRequestFileLocation(requestURL);
  const exportURL = useExportResponseURL(requestParams, data);
  return exportURL ? (
    <ExportToTerraReady
      ExportToTerraSuccess={ExportToTerraSuccess}
      exportURL={exportURL}
    />
  ) : (
    <ExportToTerraNotStarted
      ExportForm={ExportForm}
      ExportToTerra={ExportToTerra}
      isLoading={isLoading}
      run={run}
    />
  );
};
