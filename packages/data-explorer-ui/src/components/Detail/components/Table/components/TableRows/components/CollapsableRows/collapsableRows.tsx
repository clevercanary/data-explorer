import { TableRow } from "@mui/material";
import { Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { CollapsableCell } from "../../../../../../../Table/components/TableCell/components/CollapsableCell/collapsableCell";

export interface CollapsableRowsProps<T> {
  tableInstance: Table<T>;
}

export const CollapsableRows = <T extends object>({
  tableInstance,
}: CollapsableRowsProps<T>): JSX.Element => {
  const { getRowModel } = tableInstance;
  const { rows } = getRowModel();
  return (
    <Fragment>
      {rows.map((row) => {
        return (
          <TableRow key={row.id}>
            <CollapsableCell row={row} />
          </TableRow>
        );
      })}
    </Fragment>
  );
};
