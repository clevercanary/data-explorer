import { TableBody as MTableBody } from "@mui/material";
import { Table } from "@tanstack/react-table";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import React, { useCallback } from "react";
import { CollapsableRows } from "../TableRows/components/CollapsableRows/collapsableRows";
import { VirtualizedRow } from "../TableRows/components/VirtualizedRow/virtualizedRow";
import { TableRows } from "../TableRows/tableRows";

const OVERSCAN = 20;

export interface TableBodyProps<T> {
  tableInstance: Table<T>;
  tabletUp: boolean;
}

export const TableBody = <T extends object>({
  tableInstance,
  tabletUp,
}: TableBodyProps<T>): JSX.Element => {
  const { getRowModel } = tableInstance;
  const { rows } = getRowModel();
  const estimateSize = useCallback(() => 100, []);
  const count = rows.length;
  const virtualizer = useWindowVirtualizer({
    count,
    estimateSize,
    measureElement: (el) => measureElement(el, tabletUp),
    overscan: OVERSCAN,
  });
  return (
    <MTableBody>
      <VirtualizedRow isUpperRow={true} virtualizer={virtualizer} />
      {tabletUp ? (
        <TableRows tableInstance={tableInstance} virtualizer={virtualizer} />
      ) : (
        <CollapsableRows
          tableInstance={tableInstance}
          virtualizer={virtualizer}
        />
      )}
      <VirtualizedRow isUpperRow={false} virtualizer={virtualizer} />
    </MTableBody>
  );
};

/**
 * Measures the height of the element.
 * @param element - Element to measure.
 * @param tabletUp - True if the device is tablet or larger.
 * @returns height of the element.
 */
function measureElement(element: Element, tabletUp: boolean): number {
  // When the viewport is tablet-sized or larger, this code measures the specified element, which is the row.
  // We select the first child element because the row is not a box element due to the "display: contents" style attribute.
  const box = tabletUp ? element.children[0] : element;
  if (!box) {
    return 0;
  }
  return box.getBoundingClientRect().height;
}
