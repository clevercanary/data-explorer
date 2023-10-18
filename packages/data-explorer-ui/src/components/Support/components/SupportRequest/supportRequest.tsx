import React, { ElementType, useState } from "react";
import { FormDialog } from "./components/Dialog/dialog";

export interface SupportRequestProps {
  SupportRequestForm: ElementType;
  SupportRequestSubmitted: ElementType;
}

export const SupportRequest = ({
  SupportRequestForm: RequestForm,
  SupportRequestSubmitted: FormSubmitted,
}: SupportRequestProps): JSX.Element => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  return (
    <FormDialog setFormSubmitted={setFormSubmitted}>
      {formSubmitted ? (
        <FormSubmitted />
      ) : (
        <RequestForm setFormSubmitted={setFormSubmitted} />
      )}
    </FormDialog>
  );
};
