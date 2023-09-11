import React, { Dispatch, SetStateAction } from "react";
import { FormFacet, ManifestDownloadFormat } from "../../../../common/entities";
import { ExportManifestDownloadFormatForm } from "../../../ExportForm/components/ExportManifestDownloadFormatForm/exportManifestDownloadFormatForm";
import { ExportForm } from "../../../ExportForm/exportForm";

export interface ExportToTerraFormProps {
  formFacet: FormFacet;
  isLoading: boolean;
  manifestDownloadFormat?: ManifestDownloadFormat;
  manifestDownloadFormats: ManifestDownloadFormat[];
  setIsRequestFormValid: Dispatch<SetStateAction<boolean>>;
}

export const ExportToTerraForm = ({
  formFacet,
  isLoading,
  manifestDownloadFormat,
  manifestDownloadFormats,
  setIsRequestFormValid,
}: ExportToTerraFormProps): JSX.Element => {
  return (
    <ExportForm
      formFacet={formFacet}
      isLoading={isLoading}
      setIsRequestFormValid={setIsRequestFormValid}
    >
      <ExportManifestDownloadFormatForm
        manifestDownloadFormat={manifestDownloadFormat}
        manifestDownloadFormats={manifestDownloadFormats}
      />
    </ExportForm>
  );
};
