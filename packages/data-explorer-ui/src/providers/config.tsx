import React, { createContext, ReactNode } from "react";
import { SiteConfig } from "../config/entities";
import { getDefaultConfig } from "../config/utils";

export type ConfigContextProps = {
  config: SiteConfig;
};

export interface ConfigProps {
  children: ReactNode | ReactNode[];
  config: SiteConfig;
}

export const ConfigContext = createContext<ConfigContextProps>({
  config: getDefaultConfig(),
});

export function ConfigProvider({ children, config }: ConfigProps): JSX.Element {
  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
}
