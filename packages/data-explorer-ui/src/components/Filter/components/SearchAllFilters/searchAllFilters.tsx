import {
  Autocomplete,
  AutocompleteRenderInputParams,
  ListProps as MListProps,
} from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import { SelectCategoryView } from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { SearchAllFiltersSearch } from "../SearchAllFiltersSearch/searchAllFiltersSearch";
import { PAPER_PROPS, POPPER_PROPS } from "./common/constants";
import { AutocompletePopper } from "./components/AutocompletePopper/autocompletePopper";
import { VariableSizeList } from "./components/VariableSizeList/VariableSizeList";

export interface SearchAllFiltersProps {
  categoryViews: SelectCategoryView[];
  onFilter: OnFilterFn;
}

interface ListboxContextValue {
  categoryViews: SelectCategoryView[];
  onFilter: OnFilterFn;
  searchTerm: string;
}

const renderInput = (params: AutocompleteRenderInputParams): JSX.Element => (
  <SearchAllFiltersSearch {...params} />
);

const ListboxContext = createContext<ListboxContextValue>({
  categoryViews: [],
  onFilter: (): void => undefined,
  searchTerm: "",
});

const Listbox = React.forwardRef<HTMLUListElement, MListProps>(function Listbox(
  props,
  ref
): JSX.Element {
  props = Object.assign({}, props, {
    children: undefined,
  });
  const { categoryViews, onFilter, searchTerm } = useContext(ListboxContext);
  return (
    <VariableSizeList
      autocompleteListProps={props}
      categoryViews={categoryViews}
      onFilter={onFilter}
      ref={ref}
      searchTerm={searchTerm}
    />
  );
});

export const SearchAllFilters = ({
  categoryViews,
  onFilter,
}: SearchAllFiltersProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ListboxContext.Provider value={{ categoryViews, onFilter, searchTerm }}>
      <Autocomplete
        filterOptions={(options): string[] => options}
        freeSolo
        ListboxComponent={Listbox}
        onInputChange={(event, value): void => setSearchTerm(value)}
        options={[""]}
        PopperComponent={AutocompletePopper}
        renderInput={renderInput}
        renderOption={(): React.ReactNode => ""}
        slotProps={{
          paper: { ...PAPER_PROPS },
          popper: { ...POPPER_PROPS },
        }}
      />
    </ListboxContext.Provider>
  );
};
