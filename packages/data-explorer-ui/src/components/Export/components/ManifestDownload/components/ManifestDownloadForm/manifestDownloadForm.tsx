import React, { Dispatch, SetStateAction } from "react";
import { FormFacet } from "../../../../common/entities";
import { ExportForm } from "../../../ExportForm/exportForm";

export interface ManifestDownloadFormProps {
  formFacet: FormFacet;
  isLoading: boolean;
  setIsRequestFormValid: Dispatch<SetStateAction<boolean>>;
}

export const ManifestDownloadForm = ({
  formFacet,
  isLoading,
  setIsRequestFormValid,
}: ManifestDownloadFormProps): JSX.Element => {
  return (
    <ExportForm
      formFacet={formFacet}
      isLoading={isLoading}
      setIsRequestFormValid={setIsRequestFormValid}
    />
  );
};
