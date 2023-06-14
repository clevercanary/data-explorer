import React, { createContext, ReactNode, useState } from "react";
import { Filters } from "../common/entities";
import { BulkDownloadExecutionEnvironment } from "../components/Export/common/entities";

export type UpdateExecutionEnvironmentFn = (
  environment: BulkDownloadExecutionEnvironment
) => void;
export type UpdateExportFiltersFn = (filters: Filters) => void;

export type DetailStateContextProps = {
  executionEnvironment?: BulkDownloadExecutionEnvironment;
  exportFilters: Filters;
  updateExecutionEnvironment: UpdateExecutionEnvironmentFn;
  updateExportFilters: UpdateExportFiltersFn;
};

export interface DetailStateProps {
  children: ReactNode | ReactNode[];
}

export const DetailStateContext = createContext<DetailStateContextProps>({
  executionEnvironment: undefined,
  exportFilters: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  updateExecutionEnvironment: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  updateExportFilters: () => {},
});

export function DetailStateProvider({
  children,
}: DetailStateProps): JSX.Element {
  const [executionEnvironment, setExecutionEnvironment] =
    useState<BulkDownloadExecutionEnvironment>();
  const [exportFilters, setExportFilters] = useState<Filters>([]);

  // Updates bulk download execution environment.
  const updateExecutionEnvironment = (
    environment: BulkDownloadExecutionEnvironment
  ): void => {
    setExecutionEnvironment(environment);
  };

  // Updates export filters.
  const updateExportFilters = (filters: Filters): void => {
    setExportFilters(filters);
  };

  return (
    <DetailStateContext.Provider
      value={{
        executionEnvironment,
        exportFilters,
        updateExecutionEnvironment,
        updateExportFilters,
      }}
    >
      {children}
    </DetailStateContext.Provider>
  );
}
