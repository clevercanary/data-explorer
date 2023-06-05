import React, { createContext, ReactNode, useState } from "react";
import { Filters } from "../common/entities";

export type UpdateExportFilters = (filters: Filters) => void;

export type DetailStateContextProps = {
  exportFilters: Filters;
  updateExportFilters: UpdateExportFilters;
};

export interface DetailStateProps {
  children: ReactNode | ReactNode[];
}

export const DetailStateContext = createContext<DetailStateContextProps>({
  exportFilters: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  updateExportFilters: () => {},
});

export function DetailStateProvider({
  children,
}: DetailStateProps): JSX.Element {
  const [exportFilters, setExportFilters] = useState<Filters>([]);

  // Updates export filters.
  const updateExportFilters = (filters: Filters): void => {
    setExportFilters(filters);
  };

  return (
    <DetailStateContext.Provider
      value={{
        exportFilters,
        updateExportFilters,
      }}
    >
      {children}
    </DetailStateContext.Provider>
  );
}
