import {
  TableCell,
  TableHead as MTableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { flexRender, Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { getTableSortLabelProps } from "../../common/utils";

export interface TableHeadProps<T> {
  tableInstance: Table<T>;
  tabletUp: boolean;
}

export const TableHead = <T extends object>({
  tableInstance,
  tabletUp,
}: TableHeadProps<T>): JSX.Element => {
  return (
    <Fragment>
      {tabletUp &&
        tableInstance.getHeaderGroups().map((headerGroup) => (
          <MTableHead key={headerGroup.id}>
            <TableRow>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  <TableSortLabel {...getTableSortLabelProps(header.column)}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </MTableHead>
        ))}
    </Fragment>
  );
};
