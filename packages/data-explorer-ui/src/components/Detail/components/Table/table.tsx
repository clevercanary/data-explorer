import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Table as GridTable } from "../../../Table/table.styles";

interface TableProps<T extends object> {
  columns: ColumnDef<T>[];
  gridTemplateColumns: string;
  items: T[];
}

export const Table = <T extends object>({
  columns,
  gridTemplateColumns,
  items,
}: TableProps<T>): JSX.Element => {
  const tableInstance = useReactTable({
    columns,
    data: items,
    getCoreRowModel: getCoreRowModel(),
  });
  const { getHeaderGroups, getRowModel } = tableInstance;
  return (
    <TableContainer>
      <GridTable gridTemplateColumns={gridTemplateColumns}>
        {getHeaderGroups().map((headerGroup) => (
          <TableHead key={headerGroup.id}>
            <TableRow>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        ))}
        <TableBody>
          {getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </GridTable>
    </TableContainer>
  );
};
