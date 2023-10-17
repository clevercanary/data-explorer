import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { FormHelperText, Typography } from "@mui/material";
import React from "react";
import { DropzoneState } from "react-dropzone";
import { TEXT_BODY_400 } from "../../../../../theme/common/typography";
import { Loading, LOADING_PANEL_STYLE } from "../../../../Loading/loading";
import { FormState } from "../../../../Support/components/SupportRequest/components/SupportRequestForm/common/entities";
import { ErrorIcon } from "../../../CustomIcon/components/ErrorIcon/errorIcon";
import { InputFormControl } from "../Input/input.styles";
import { Button, Underline } from "./uploadFile.styles";

export interface UploadFileProps {
  attachmentName: FormState["attachmentName"];
  attachmentRejected: FormState["attachmentRejected"];
  attachmentRejections: FormState["attachmentRejections"];
  attachmentToken: FormState["attachmentToken"];
  attachmentUploading: FormState["attachmentUploading"];
  className?: string;
  isDragActive: boolean;
  label: string;
  onAttachmentDeleted: () => void;
  open: DropzoneState["open"];
}

export const UploadFile = ({
  attachmentName,
  attachmentRejected,
  attachmentRejections,
  attachmentToken,
  attachmentUploading,
  className,
  isDragActive,
  label,
  onAttachmentDeleted,
  open,
}: UploadFileProps): JSX.Element => {
  const error = attachmentRejected;
  const isAttached = Boolean(attachmentToken);
  return (
    <InputFormControl className={className} error={error}>
      {label && <Typography variant={TEXT_BODY_400}>{label}</Typography>}
      <Button
        isAttached={isAttached}
        isDragActive={isDragActive}
        isError={error}
        onClick={attachmentToken ? onAttachmentDeleted : open}
      >
        <Loading
          iconSize="small"
          loading={attachmentUploading}
          panelStyle={LOADING_PANEL_STYLE.INHERIT}
        />
        <Typography variant={TEXT_BODY_400}>
          {isAttached ? (
            attachmentName
          ) : (
            <>
              Drag or <Underline>Click</Underline> to attach file
            </>
          )}
        </Typography>
        {isAttached && <CloseRoundedIcon fontSize="small" />}
      </Button>
      {error && (
        <FormHelperText>
          <ErrorIcon fontSize="xxsmall" />
          {getErrorMessage(attachmentRejections)}
        </FormHelperText>
      )}
    </InputFormControl>
  );
};

/**
 * Returns the error message for the attachment.
 * @param attachmentRejections - Attachment rejections.
 * @returns error message.
 */
function getErrorMessage(
  attachmentRejections: FormState["attachmentRejections"]
): string {
  const fileSizeError = attachmentRejections.find(
    (rejection) => rejection.code === "file-too-large"
  );
  return fileSizeError
    ? "File must be less than 20 MB."
    : "Unable to upload file.";
}
