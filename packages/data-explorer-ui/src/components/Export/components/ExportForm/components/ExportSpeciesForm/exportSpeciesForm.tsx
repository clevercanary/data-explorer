import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { OnFilterFn } from "../../../../../../hooks/useCategoryFilter";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { FormFileFacet } from "../../../../common/entities";
import { FormControl } from "../../exportForm.styles";

export interface ExportSpeciesFormProps {
  onFilter: OnFilterFn;
  setIsSpeciesValid: Dispatch<SetStateAction<boolean>>;
  speciesFacet: FormFileFacet;
}

export const ExportSpeciesForm = ({
  onFilter,
  setIsSpeciesValid,
  speciesFacet,
}: ExportSpeciesFormProps): JSX.Element => {
  const isSpeciesSelected = speciesFacet.selectedTermCount > 0;

  // Species form is valid if at least one species is selected.
  useEffect(() => {
    setIsSpeciesValid(isSpeciesSelected);
  }, [isSpeciesSelected, setIsSpeciesValid]);

  return (
    <FormControl>
      <FormLabel>{speciesFacet.formLabel || "Species"}</FormLabel>
      <FormGroup>
        {speciesFacet.terms.map(({ name, selected }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={selected}
                checkedIcon={<CheckedIcon />}
                icon={<UncheckedIcon />}
                onChange={(): void =>
                  onFilter(speciesFacet.name, name, selected)
                }
              />
            }
            key={name}
            label={name}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
