import React from "react";
import { FormFacet } from "../../../../common/entities";

export interface ExportToTerraFormProps {
  formFacets: FormFacet[]; // Facets to display in the form.
}

export const ExportToTerraForm = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO.
  formFacets,
}: ExportToTerraFormProps): JSX.Element => {
  return <>{/* Export to Terra form */}</>;
};
