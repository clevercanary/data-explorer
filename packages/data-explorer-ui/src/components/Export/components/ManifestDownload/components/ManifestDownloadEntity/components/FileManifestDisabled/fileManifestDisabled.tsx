import { TableCell } from "@mui/material";
import React from "react";
import { ButtonGroup } from "../../../../../../../common/ButtonGroup/buttonGroup";
import { ButtonGroupButton } from "../../../../../../../common/ButtonGroup/components/ButtonGroupButton/buttonGroupButton";
import {
  ContentCopyIconSmall,
  DownloadIconSmall,
} from "../../../../../../../common/CustomIcon/common/constants";

export const FileManifestDisabled = (): JSX.Element => {
  return (
    <TableCell>
      <ButtonGroup
        Buttons={[
          <ButtonGroupButton
            key="download"
            action="Download"
            disabled={true}
            label={<DownloadIconSmall />}
          />,
          <ButtonGroupButton
            key="copy"
            action="Copy"
            disabled={true}
            label={<ContentCopyIconSmall />}
          />,
        ]}
      />
    </TableCell>
  );
};
