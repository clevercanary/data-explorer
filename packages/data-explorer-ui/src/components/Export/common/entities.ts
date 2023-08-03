import { MANIFEST_DOWNLOAD_FORMAT } from "../../../apis/azul/common/entities";
import { CategoryKey } from "../../../common/entities";

/**
 * Set of supported shells that bulk download curl can be executed on.
 */
export enum BULK_DOWNLOAD_EXECUTION_ENVIRONMENT {
  "BASH" = "bash",
  "CMD_EXE" = "cmd.exe",
}

/**
 * Execution environment.
 */
export type ExecutionEnvironment = BULK_DOWNLOAD_EXECUTION_ENVIRONMENT;

/**
 * Model of form related facet.
 */
export interface FormFacet {
  key: CategoryKey;
  label: string;
}

/**
 * Manifest download format.
 */
export type ManifestDownloadFormat = MANIFEST_DOWNLOAD_FORMAT;
