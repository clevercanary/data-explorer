import React from "react";
import { useRequestFileLocation } from "../../../../hooks/useRequestFileLocation";
import { PAPER_PANEL_STYLE } from "../../../common/Paper/paper";
import { Loading } from "../../../Loading/loading";
import { buildExportToTerraUrl } from "../../common/utils";
import { ExportToTerraNotStarted } from "../ExportToTerraNotStarted/exportToTerraNotStarted";
import { ExportToTerraReady } from "../ExportToTerraReady/exportToTerraReady";

export interface ExportToTerraProps {
  exportTerraUrl: string; // Environment-specific origin used when redirecting user to Terra.
  params: URLSearchParams;
  url: string;
}

export const ExportToTerra = ({
  exportTerraUrl,
  params,
  url,
}: ExportToTerraProps): JSX.Element => {
  const { data, isIdle, isLoading, isSuccess, run } = useRequestFileLocation(
    `${url}?${params.toString()}`
  );
  return (
    <>
      {/* Export is idle or loading */}
      {(isIdle || isLoading) && (
        <div>
          <Loading
            loading={isLoading}
            panelStyle={PAPER_PANEL_STYLE.FLUID}
            text="Your link will be ready shortly..."
          />
          <ExportToTerraNotStarted run={run} />
        </div>
      )}
      {/* Export is successful */}
      {isSuccess && (
        <ExportToTerraReady
          exportURL={buildExportToTerraUrl(
            exportTerraUrl,
            params,
            data?.location
          )}
        />
      )}
    </>
  );
};
