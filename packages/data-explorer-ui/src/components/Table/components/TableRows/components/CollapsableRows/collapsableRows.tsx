import { Row, Table } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import React from "react";
import { TableRow } from "./collapsableRows.styles";
import { CollapsableCell } from "./components/CollapsableCell/collapsableCell";

export interface CollapsableRowsProps<T> {
  tableInstance: Table<T>;
  virtualizer: Virtualizer<Window, Element>;
}

export const CollapsableRows = <T extends object>({
  tableInstance,
  virtualizer,
}: CollapsableRowsProps<T>): JSX.Element => {
  const { getRowModel } = tableInstance;
  const { rows } = getRowModel();
  const virtualItems = virtualizer.getVirtualItems();
  return (
    <TableRow>
      {virtualItems.map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<T>;
        return (
          <CollapsableCell
            key={row.id}
            data-index={virtualRow.index}
            forwardRef={virtualizer.measureElement}
            row={row}
          />
        );
      })}
    </TableRow>
  );
};
