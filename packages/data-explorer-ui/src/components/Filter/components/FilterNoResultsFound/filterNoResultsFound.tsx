import { Typography } from "@mui/material";
import React from "react";
import { ButtonTextPrimary } from "../../../common/Button/components/ButtonTextPrimary/buttonTextPrimary";
import { FilterNoResultsFound as FilterNoResults } from "./filterNoResultsFound.styles";

type OnClearSearchTermFn = () => void;

export interface FilterNoResultsFoundProps {
  onClearSearchTerm?: OnClearSearchTermFn;
}

export const FilterNoResultsFound = ({
  onClearSearchTerm,
}: FilterNoResultsFoundProps): JSX.Element => {
  return (
    <FilterNoResults>
      <Typography component="div" variant="text-body-500">
        No results found!
      </Typography>
      <Typography
        component="div"
        color="ink.light"
        mb={onClearSearchTerm ? 2 : 0}
        mt={1}
        variant="text-body-400"
      >
        Try adjusting your search or filter to find what you’re looking for.
      </Typography>
      {onClearSearchTerm && (
        <ButtonTextPrimary onClick={onClearSearchTerm}>
          Clear Search
        </ButtonTextPrimary>
      )}
    </FilterNoResults>
  );
};
