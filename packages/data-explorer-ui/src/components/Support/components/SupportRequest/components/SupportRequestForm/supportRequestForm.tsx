import { MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import React, {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  SetStateAction,
  useState,
} from "react";
import { FileRejection } from "react-dropzone";
import validate from "validate.js";
import { SupportRequest } from "../../../../../../config/entities";
import { useConfig } from "../../../../../../hooks/useConfig";
import { TEXT_BODY_400 } from "../../../../../../theme/common/typography";
import { ButtonPrimary } from "../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import { Input } from "../../../../../common/Form/components/Input/input";
import { Select } from "../../../../../common/Form/components/Select/select";
import { UploadFile } from "../../../../../common/Form/components/UploadFile/uploadFile";
import { GridPaper } from "../../../../../common/Paper/paper.styles";
import {
  SectionActions,
  SectionContent,
} from "../../../../../common/Section/section.styles";
import Dropzone from "../Dropzone/dropzone";
import {
  CONSTRAINTS,
  DEFAULT_FORM_STATE,
  DRAGGING_STYLE,
  MAX_ATTACHMENT_SIZE,
  OPTIONS,
} from "./common/constants";
import {
  FormState,
  FORM_CONTROL_LABEL,
  FORM_CONTROL_NAME,
  RequestValue,
  ValidateResponse,
} from "./common/entities";
import { createSupportRequest, uploadAttachment } from "./common/utils";
import { Section, Title } from "./supportRequestForm.styles";

export interface SupportRequestFormProps {
  setFormSubmitted: Dispatch<SetStateAction<boolean>>;
}

export const SupportRequestForm = ({
  setFormSubmitted,
}: SupportRequestFormProps): JSX.Element => {
  const { config } = useConfig() || {};
  const [formState, setFormState] = useState<FormState>(DEFAULT_FORM_STATE);
  const supportRequest = config.layout.support
    ?.supportRequest as SupportRequest; // Support request must be configured.
  const errors = validate(buildSupportRequest(formState), CONSTRAINTS); // Determine error state of form

  // Delete attachment.
  const onAttachmentDeleted = (): void => {
    setFormState((formState) => ({
      ...formState,
      attachmentToken: "",
    }));
  };

  // Upload file to add as attachment to request.
  const onAttachmentDropped = async <T extends File>(
    files: T[]
  ): Promise<void> => {
    try {
      setFormState((formState) => ({
        ...formState,
        attachmentRejected: false,
        attachmentRejections: [],
        attachmentUploading: true,
      }));
      const response = await uploadAttachment(
        supportRequest.uploadURL,
        files[0]
      );
      setFormState((formState) => ({
        ...formState,
        attachmentName: response.attachment.file_name,
        attachmentToken: response.token,
        attachmentUploading: false,
      }));
    } catch (error) {
      setFormState((formState) => ({
        ...formState,
        attachmentRejected: true,
        attachmentRejections: [],
        attachmentUploading: false,
      }));
      console.log(error);
    }
  };

  // Attachment has been rejected (on drop of file).
  const onAttachmentRejected = (fileRejections: FileRejection[]): void => {
    // We can assume there is a single error as we are not doing multiple uploads.
    const rejection = fileRejections[0] || {};
    setFormState((formState) => ({
      ...formState,
      attachmentRejected: true,
      attachmentRejections: rejection.errors,
    }));
  };

  // Indicate input/select field has been touched.
  const onBlur = (event: FocusEvent<HTMLInputElement>): void => {
    const target = event.target;
    setFormState((formState) => ({
      ...formState,
      touched: {
        ...formState.touched,
        [target.name]: true,
      },
    }));
  };

  // Bind input value to state.
  const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormState((formState) => ({
      ...formState,
      [name]: value,
    }));
  };

  // Updates form state with the selected question type.
  const onSelectChange = (event: SelectChangeEvent<unknown>): void => {
    setFormState((formState) => ({
      ...formState,
      type: event.target.value as string,
    }));
  };

  // Handle submit of support request form.
  const onSupportRequestSubmitted = async (): Promise<void> => {
    const request = buildSupportRequest(formState);
    try {
      setFormState((formState) => ({
        ...formState,
        submitError: false,
        submitting: true,
      }));
      await createSupportRequest(supportRequest.requestURL, request);
      setFormState((formState) => ({
        ...formState,
        submitted: true,
        submitting: false,
      }));
      setFormSubmitted(true); // Shows form submitted message.
      // Execute GTM tracking.
      // TODO(cc) add GTM tracking.
    } catch (error) {
      setFormState((formState) => ({
        ...formState,
        submitError: true,
        submitting: false,
      }));
      console.log(error);
    }
  };

  return (
    <Dropzone
      activeStyle={DRAGGING_STYLE}
      disabled={Boolean(formState[FORM_CONTROL_NAME.ATTACHMENT_TOKEN])}
      maxSize={MAX_ATTACHMENT_SIZE}
      multiple={false}
      onDropAccepted={onAttachmentDropped}
      onDropRejected={onAttachmentRejected}
    >
      {({ isDragActive, open }): JSX.Element => (
        <GridPaper>
          <Section>
            <SectionContent>
              <Title>Contact Us</Title>
              <Typography color="ink.light" variant={TEXT_BODY_400}>
                We’re here to help and answer any questions you might have. We
                look forward to hearing from you!
              </Typography>
            </SectionContent>
          </Section>
          <Section>
            <Input
              error={isFieldError(formState, errors, FORM_CONTROL_NAME.NAME)}
              isFilled={Boolean(formState[FORM_CONTROL_NAME.NAME])}
              label={FORM_CONTROL_LABEL.NAME}
              name={FORM_CONTROL_NAME.NAME}
              onBlur={onBlur}
              onChange={onInputChange}
            />
            <Input
              error={isFieldError(formState, errors, FORM_CONTROL_NAME.EMAIL)}
              isFilled={Boolean(formState[FORM_CONTROL_NAME.EMAIL])}
              label={FORM_CONTROL_LABEL.EMAIL}
              name={FORM_CONTROL_NAME.EMAIL}
              onBlur={onBlur}
              onChange={onInputChange}
            />
            <Select
              displayEmpty={true}
              error={isFieldError(formState, errors, FORM_CONTROL_NAME.TYPE)}
              isFilled={Boolean(formState[FORM_CONTROL_NAME.TYPE])}
              label={FORM_CONTROL_LABEL.TYPE}
              name={FORM_CONTROL_NAME.TYPE}
              onBlur={onBlur}
              onChange={onSelectChange}
              renderValue={renderSelectValue}
              value={formState[FORM_CONTROL_NAME.TYPE]}
              variant="outlined"
            >
              {OPTIONS.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
            <Input
              error={isFieldError(formState, errors, FORM_CONTROL_NAME.SUBJECT)}
              isFilled={Boolean(formState[FORM_CONTROL_NAME.SUBJECT])}
              label={FORM_CONTROL_LABEL.SUBJECT}
              name={FORM_CONTROL_NAME.SUBJECT}
              onBlur={onBlur}
              onChange={onInputChange}
            />
            <Input
              error={isFieldError(
                formState,
                errors,
                FORM_CONTROL_NAME.DESCRIPTION
              )}
              isFilled={Boolean(formState[FORM_CONTROL_NAME.DESCRIPTION])}
              label={FORM_CONTROL_LABEL.DESCRIPTION}
              multiline
              name={FORM_CONTROL_NAME.DESCRIPTION}
              onBlur={onBlur}
              onChange={onInputChange}
              placeholder="Enter a decription"
              rows={2}
            />
            <UploadFile
              isDragActive={isDragActive}
              label={FORM_CONTROL_LABEL.ATTACHMENT_TOKEN}
              onAttachmentDeleted={onAttachmentDeleted}
              open={open}
              {...formState}
            />
          </Section>
          <Section>
            <SectionActions>
              <ButtonPrimary
                disabled={Boolean(errors) || formState.submitting}
                fullWidth
                onClick={onSupportRequestSubmitted}
              >
                Send
              </ButtonPrimary>
            </SectionActions>
          </Section>
        </GridPaper>
      )}
    </Dropzone>
  );
};

/**
 * Build support request model from form values.
 * @param formState - Form State.
 * @returns support request.
 */
function buildSupportRequest(formState: FormState): RequestValue {
  const { attachmentToken, description, email, name, subject, type } =
    formState;
  return {
    attachmentToken,
    description,
    email,
    name,
    subject,
    type,
  };
}

/**
 * Returns true if the given field is touched and has an error.
 * @param formState - Form state.
 * @param error - Validate.js error object.
 * @param fieldName - Field name.
 * @returns true if the given field has an error.
 */
function isFieldError(
  formState: FormState,
  error: ValidateResponse | undefined,
  fieldName: FORM_CONTROL_NAME
): boolean {
  const hasError = Boolean(error?.[fieldName]);
  const isTouched = Boolean(formState.touched[fieldName]);
  return isTouched && hasError;
}

/**
 * Renders select value.
 * @param value - Select value.
 * @returns select value.
 */
function renderSelectValue(value: unknown): string {
  const label = OPTIONS.find((option) => option.value === value)?.label;
  return label || "Choose subject";
}
