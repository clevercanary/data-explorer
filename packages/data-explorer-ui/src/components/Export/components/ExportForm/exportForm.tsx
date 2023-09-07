import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CategoryKey, CategoryValueKey } from "../../../../common/entities";
import { useFileManifestState } from "../../../../hooks/useFileManifestState";
import { FileManifestActionKind } from "../../../../providers/fileManifestState";
import { PAPER_PANEL_STYLE } from "../../../common/Paper/paper";
import { Loading } from "../../../Loading/loading";
import { FormFacet } from "../../common/entities";
import { SectionForm } from "../../export.styles";
import { ExportFileSummaryForm } from "./components/ExportFileSummaryForm/exportFileSummaryForm";
import { ExportSpeciesForm } from "./components/ExportSpeciesForm/exportSpeciesForm";

export interface ExportFormProps {
  children?: ReactNode;
  formFacet: FormFacet;
  isLoading: boolean;
  setIsRequestFormValid: Dispatch<SetStateAction<boolean>>;
}

export const ExportForm = ({
  children,
  formFacet,
  isLoading,
  setIsRequestFormValid,
}: ExportFormProps): JSX.Element => {
  const { fileSummaryFacet, speciesFacet } = formFacet;
  const { fileManifestDispatch } = useFileManifestState();
  const [isSpeciesValid, setIsSpeciesValid] = useState<boolean>(false);
  const [isFileSummaryValid, setIsFileSummaryValid] = useState<boolean>(false);

  // Updates file manifest filter state.
  const onFilter = (
    categoryKey: CategoryKey,
    selectedCategoryValue: CategoryValueKey,
    selected: boolean
  ): void => {
    fileManifestDispatch({
      payload: {
        categoryKey,
        selected: !selected,
        selectedValue: selectedCategoryValue,
      },
      type: FileManifestActionKind.UpdateFilter,
    });
  };

  // Updates file manifest filter state by selected category key.
  const onUpdateFilterFacet = (categoryKey: CategoryKey): void => {
    fileManifestDispatch({
      payload: categoryKey,
      type: FileManifestActionKind.UpdateFiltersCategory,
    });
  };

  // Sets export form valid state.
  // That is, at least one file format as well as species is selected.
  useEffect(() => {
    setIsRequestFormValid(isSpeciesValid && isFileSummaryValid);
  }, [isFileSummaryValid, isSpeciesValid, setIsRequestFormValid]);

  return (
    <SectionForm>
      <Loading loading={isLoading} panelStyle={PAPER_PANEL_STYLE.NONE} />
      {/* Render form when all facets are available. */}
      {speciesFacet && fileSummaryFacet && (
        <>
          <ExportSpeciesForm
            onFilter={onFilter}
            setIsSpeciesValid={setIsSpeciesValid}
            speciesFacet={speciesFacet}
          />
          <ExportFileSummaryForm
            onFilter={onFilter}
            onUpdateFilterFacet={onUpdateFilterFacet}
            setIsFileSummaryValid={setIsFileSummaryValid}
            fileSummaryFacet={fileSummaryFacet}
          />
          {children}
        </>
      )}
    </SectionForm>
  );
};
