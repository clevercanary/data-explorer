import {
  Autocomplete,
  AutocompleteRenderInputParams,
  ListProps as MListProps,
} from "@mui/material";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SelectCategoryView } from "../../../../common/entities";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { DESKTOP_SM } from "../../../../theme/common/breakpoints";
import { SearchCloseButton } from "../SearchAllFiltersSearch/components/SearchCloseButton/searchCloseButton";
import { SearchAllFiltersSearch } from "../SearchAllFiltersSearch/searchAllFiltersSearch";
import { DEFAULT_SLOT_PROPS, DRAWER_SLOT_PROPS } from "./common/constants";
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
    children: undefined, // Content is controlled by VariableSizeList
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
  const desktopSmDown = useBreakpointHelper(
    BREAKPOINT_FN_NAME.DOWN,
    DESKTOP_SM
  );
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Close search.
  const closeSearch = (): void => {
    setOpen(false);
  };

  // Open search.
  const openSearch = (): void => {
    setOpen(true);
  };

  // End adornment for search input.
  const renderEndAdornment = (endAdornment: ReactNode): ReactNode => {
    if (desktopSmDown) {
      return <SearchCloseButton closeSearch={closeSearch} />;
    }
    return endAdornment;
  };

  useEffect(() => {
    if (!open) {
      autocompleteRef.current?.querySelector("input")?.blur();
    }
  }, [open]);

  return (
    <ListboxContext.Provider value={{ categoryViews, onFilter, searchTerm }}>
      <Autocomplete
        clearOnBlur
        filterOptions={(options): string[] => options}
        freeSolo
        ListboxComponent={Listbox}
        onBlur={closeSearch}
        onClose={closeSearch}
        onFocus={openSearch}
        onInputChange={(event, value): void => setSearchTerm(value)}
        open={open}
        options={[""]} // Placeholder options, since item rendering is fully controlled by VariableSizeList
        PopperComponent={AutocompletePopper}
        ref={autocompleteRef}
        renderInput={(props): JSX.Element =>
          renderInput({
            ...props,
            InputProps: {
              ...props.InputProps,
              endAdornment: renderEndAdornment(props.InputProps.endAdornment),
            },
          })
        }
        slotProps={desktopSmDown ? DRAWER_SLOT_PROPS : DEFAULT_SLOT_PROPS}
      />
    </ListboxContext.Provider>
  );
};
