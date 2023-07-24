import React from "react";
import { CategoryKey } from "../../../../../../common/entities";
import { ExecutionEnvironment } from "../../../../common/entities";

export type OnUpdateExecutionEnvironmentFn = (
  executionEnvironment: ExecutionEnvironment
) => void;

export interface FormFacet {
  key: CategoryKey;
  label: string;
}

export interface DownloadCurlCommandFormProps {
  executionEnvironment: ExecutionEnvironment;
  formFacets: FormFacet[]; // Facets to display in the form.
  onUpdateExecutionEnvironment: OnUpdateExecutionEnvironmentFn;
}

export const DownloadCurlCommandForm = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO.
  formFacets,
}: DownloadCurlCommandFormProps): JSX.Element => {
  return <>{/* Download curl command form */}</>;
};
