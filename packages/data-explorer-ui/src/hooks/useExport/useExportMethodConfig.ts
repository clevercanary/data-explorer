import { useMemo } from "react";
import { Breadcrumb } from "../../components/common/Breadcrumbs/breadcrumbs";
import { ComponentsConfig } from "../../config/entities";
import { useExploreState } from "../useExploreState";
import { useExportConfig } from "../useExportConfig";

export interface ExportMethodConfig {
  breadcrumbs: Breadcrumb[];
  sideColumn?: ComponentsConfig;
}

/**
 * Returns export method config for the export method view i.e. hero breadcrumbs and side column configuration.
 * @param title - Export method title.
 * @returns export method config.
 */
export const useExportMethodConfig = (title: string): ExportMethodConfig => {
  const { exploreState } = useExploreState();
  const { tabs } = useExportConfig();
  const currentTab = tabs[0];
  const { route, sideColumn } = currentTab;
  const { tabValue } = exploreState;
  const breadcrumbs = useMemo(() => {
    return [
      { path: `/${tabValue}`, text: "Explore" },
      { path: route, text: "Export Selected Data" },
      { path: "", text: title },
    ];
  }, [route, tabValue, title]);

  return {
    breadcrumbs,
    sideColumn,
  };
};
