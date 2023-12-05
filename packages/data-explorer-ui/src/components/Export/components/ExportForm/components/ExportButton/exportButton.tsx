import { Tooltip } from "@mui/material";
import React, { ElementType, ReactNode } from "react";
import { useDownloadStatus } from "../../../../../../hooks/useDownloadStatus";
import { ButtonPrimary } from "../../../../../common/Button/components/ButtonPrimary/buttonPrimary";

export interface ExportButtonProps {
  Button?: ElementType;
  children: ReactNode;
  disabled: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

export const ExportButton = ({
  Button = ButtonPrimary,
  children,
  disabled,
  isLoading = false,
  onClick,
}: ExportButtonProps): JSX.Element => {
  const downloadStatus = useDownloadStatus();
  return (
    <Tooltip arrow title={isLoading ? null : downloadStatus.message}>
      <span>
        <Button
          disabled={
            disabled ||
            isLoading ||
            downloadStatus.disabled ||
            downloadStatus.isLoading
          }
          onClick={onClick}
        >
          <span>{children}</span>
        </Button>
      </span>
    </Tooltip>
  );
};
