import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { formatCountSize } from "../../../../../../utils/formatCountSize";
import { formatFileSize } from "../../../../../../utils/formatFileSize";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { GridTable } from "../../../../../Table/common/gridTable.styles";
import { FileSummaryFacet } from "../../../../common/entities";
import { OnFilterFn, OnUpdateFilterFacet } from "../../common/entities";
import {
  GridPaper,
  TableFormControl as FormControl,
} from "../../exportForm.styles";

export interface ExportFileSummaryFormProps {
  fileSummaryFacet: FileSummaryFacet;
  onFilter: OnFilterFn;
  onUpdateFilterFacet: OnUpdateFilterFacet;
  setIsFileSummaryValid: Dispatch<SetStateAction<boolean>>;
}

export const ExportFileSummaryForm = ({
  fileSummaryFacet,
  onFilter,
  onUpdateFilterFacet,
  setIsFileSummaryValid,
}: ExportFileSummaryFormProps): JSX.Element => {
  const isFileSummarySelected = fileSummaryFacet.selectedTermCount > 0;
  const hasFileSize = isFileSummaryFacet(fileSummaryFacet);
  const gridTemplateColumns = hasFileSize ? "1fr auto auto" : "1fr auto";

  // File summary form is valid if at least one file summary is selected.
  useEffect(() => {
    setIsFileSummaryValid(isFileSummarySelected);
  }, [isFileSummarySelected, setIsFileSummaryValid]);

  return (
    <FormControl>
      <FormLabel>{fileSummaryFacet.formLabel || "File Type"}</FormLabel>
      <GridPaper>
        <GridTable gridTemplateColumns={gridTemplateColumns}>
          <TableHead>
            <TableRow>
              <TableCell>
                <FormControlLabel
                  label="Name"
                  control={
                    <Checkbox
                      checked={
                        fileSummaryFacet.selectedTermCount ===
                        fileSummaryFacet.termCount
                      }
                      checkedIcon={<CheckedIcon />}
                      icon={<UncheckedIcon />}
                      onChange={(): void =>
                        onUpdateFilterFacet(fileSummaryFacet.name)
                      }
                    />
                  }
                />
              </TableCell>
              <TableCell>File Count</TableCell>
              {hasFileSize && <TableCell>File Size</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {fileSummaryFacet.terms.map(
                ({ count, name, selected, size = 0 }) => (
                  <Fragment key={name}>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selected}
                            checkedIcon={<CheckedIcon />}
                            icon={<UncheckedIcon />}
                            onChange={(): void =>
                              onFilter(fileSummaryFacet.name, name, selected)
                            }
                          />
                        }
                        key={name}
                        label={name}
                      />
                    </TableCell>
                    <TableCell>{formatCountSize(count)}</TableCell>
                    {hasFileSize && (
                      <TableCell>{formatFileSize(size)}</TableCell>
                    )}
                  </Fragment>
                )
              )}
            </TableRow>
          </TableBody>
        </GridTable>
      </GridPaper>
    </FormControl>
  );
};

/**
 * Returns true if the file summary facet has file size.
 * @param fileSummaryFacet - File summary facet.
 * @returns true if the file summary facet has file size.
 */
function isFileSummaryFacet(fileSummaryFacet: FileSummaryFacet): boolean {
  return fileSummaryFacet.terms.some(({ size }) => size !== undefined);
}
