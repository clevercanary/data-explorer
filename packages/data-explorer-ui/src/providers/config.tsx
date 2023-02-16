import React, { createContext, ReactNode } from "react";
import { EntityConfig, SiteConfig } from "../config/entities";
import {
  getDefaultConfig,
  getDefaultEntityConfig,
  getEntityConfig,
} from "../config/utils";

export type ConfigContextProps = {
  config: SiteConfig;
  defaultEntityListType: string;
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
  defaultEntityListType: "",
  entityConfig: getDefaultEntityConfig(),
  entityListType: "",
});

export function ConfigProvider({
  children,
  config,
  entityListType,
}: ConfigProps): JSX.Element {
  const defaultEntityListType = config.redirectRootToPath.slice(1);
  const entityName = entityListType || defaultEntityListType;
  const entityConfig = getEntityConfig(config, entityName);
  return (
    <ConfigContext.Provider
      value={{
        config,
        defaultEntityListType,
        entityConfig,
        entityListType,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
