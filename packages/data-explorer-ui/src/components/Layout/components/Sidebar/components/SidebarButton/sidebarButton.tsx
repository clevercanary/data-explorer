import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import React, { ReactNode } from "react";
import { SidebarButton as Button } from "./sidebarButton.styles";

export interface SidebarButtonProps {
  className?: string;
  label: ReactNode;
  onClick: () => void;
}

export const SidebarButton = ({
  className,
  label,
  onClick,
  ...props
}: SidebarButtonProps): JSX.Element => {
  return (
    <Button className={className} onClick={onClick} {...props}>
      <FilterListRoundedIcon fontSize="small" /> {label}
    </Button>
  );
};
