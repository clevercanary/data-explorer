import React, { Dispatch, SetStateAction } from "react";
import { ExecutionEnvironment, FormFacet } from "../../../../common/entities";
import { ExportExecutionEnvironmentForm } from "../../../ExportForm/components/ExportExecutionEnvironmentForm/exportExecutionEnvironmentForm";
import { ExportForm } from "../../../ExportForm/exportForm";

export interface DownloadCurlCommandFormProps {
  executionEnvironment: ExecutionEnvironment;
  formFacet: FormFacet;
  isLoading: boolean;
  setExecutionEnvironment: Dispatch<SetStateAction<ExecutionEnvironment>>;
  setIsRequestFormValid: Dispatch<SetStateAction<boolean>>;
}

export const DownloadCurlCommandForm = ({
  executionEnvironment,
  formFacet,
  isLoading,
  setExecutionEnvironment,
  setIsRequestFormValid,
}: DownloadCurlCommandFormProps): JSX.Element => {
  return (
    <ExportForm
      formFacet={formFacet}
      isLoading={isLoading}
      setIsRequestFormValid={setIsRequestFormValid}
    >
      <ExportExecutionEnvironmentForm
        executionEnvironment={executionEnvironment}
        setExecutionEnvironment={setExecutionEnvironment}
      />
    </ExportForm>
  );
};
