import {
  Tab as MTab,
  TabProps as MTabProps,
  Tabs as MTabs,
  TabsProps as MTabsProps,
} from "@mui/material";
import React from "react";
import { TabScrollFuzz } from "./tabs.styles";

export type TabsValue = MTabsProps["value"]; // any
export type TabValue = MTabProps["value"]; // any
export type OnTabChangeFn = (tabValue: TabValue) => void; // Function invoked when selected tab value changes.

export interface Tab {
  count?: string;
  icon?: MTabProps["icon"]; // element or string
  iconPosition?: MTabProps["iconPosition"]; // "bottom" or "end" or "start" or "top
  label: string;
  value: TabValue;
}

export interface TabsProps {
  className?: string;
  onTabChange: OnTabChangeFn;
  tabs: Tab[];
  value: TabsValue;
}

export const Tabs = ({
  className,
  onTabChange,
  tabs,
  value,
}: TabsProps): JSX.Element => {
  return (
    <MTabs
      className={className}
      onChange={(_, tabValue): void => onTabChange(tabValue)}
      ScrollButtonComponent={TabScrollFuzz} // Utilizing MuiTabScrollButton to show/hide scroll fuzz.
      value={value}
    >
      {tabs.map(
        (
          { count, icon, iconPosition = "start", label, value: tabValue },
          t
        ) => (
          <MTab
            icon={icon}
            iconPosition={icon ? iconPosition : undefined}
            key={`${label}${t}`}
            label={count ? `${label} (${count})` : label}
            value={tabValue}
          />
        )
      )}
    </MTabs>
  );
};
