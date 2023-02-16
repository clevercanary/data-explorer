import React, { createContext, ReactNode } from "react";
import { EntityConfig, SiteConfig } from "../config/entities";
import {
  getDefaultConfig,
  getDefaultEntityConfig,
  getEntityConfig,
} from "../config/utils";

export type ConfigContextProps = {
  config: SiteConfig;
  entityConfig: EntityConfig;
  entityListType: string;
};

export interface ConfigProps {
  children: ReactNode | ReactNode[];
  config: SiteConfig;
  entityListType: string;
}

export const ConfigContext = createContext<ConfigContextProps>({
  config: getDefaultConfig(),
  entityConfig: getDefaultEntityConfig(),
  entityListType: "",
});

export function ConfigProvider({
  children,
  config,
  entityListType,
}: ConfigProps): JSX.Element {
  const redirect = config.redirectRootToPath.slice(1);
  const entityName = entityListType || redirect;
  const entityConfig = getEntityConfig(config, entityName);
  return (
    <ConfigContext.Provider value={{ config, entityConfig, entityListType }}>
      {children}
    </ConfigContext.Provider>
  );
}
