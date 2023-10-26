import { Collapse, IconButton, Typography } from "@mui/material";
import { Cell, flexRender, Row } from "@tanstack/react-table";
import React, { ForwardedRef, useState } from "react";
import { TEXT_BODY_400_2_LINES } from "../../../../../../../../theme/common/typography";
import { UnfoldMoreIcon } from "../../../../../../../common/CustomIcon/components/UnfoldMoreIcon/unfoldMoreIcon";
import {
  CollapsedContents,
  PinnedCell,
  TableCell,
} from "./collapsableCell.styles";

type PinnedCell<T> = [Cell<T, unknown>, number];

export interface CollapsableCellProps<T> {
  forwardRef: ForwardedRef<HTMLTableCellElement>;
  row: Row<T>;
}

export const CollapsableCell = <T extends object>({
  forwardRef,
  row,
  ...props /* Spread props to allow for visualizer specific props e.g. "data-index". */
}: CollapsableCellProps<T>): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [pinnedCell, pinnedIndex] = getPinnedCellIndex(row);

  // Toggles open/close table cell.
  const onToggleExpanded = (): void => {
    setIsExpanded((expanded) => !expanded);
  };

  return (
    <TableCell ref={forwardRef} isExpanded={isExpanded} {...props}>
      <PinnedCell>
        {flexRender(pinnedCell.column.columnDef.cell, pinnedCell.getContext())}
        <IconButton
          color="ink"
          edge="end"
          onClick={onToggleExpanded}
          size="large"
        >
          <UnfoldMoreIcon fontSize="small" />
        </IconButton>
      </PinnedCell>
      <Collapse in={isExpanded}>
        <CollapsedContents>
          {row.getVisibleCells().map((cell, i) => {
            return (
              i !== pinnedIndex && (
                <div key={cell.id}>
                  <Typography
                    component="div"
                    color="ink.light"
                    variant={TEXT_BODY_400_2_LINES}
                  >
                    {cell.column.columnDef.meta?.header}
                  </Typography>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              )
            );
          })}
        </CollapsedContents>
      </Collapse>
    </TableCell>
  );
};

/**
 * Returns the pinned cell and its index tuple.
 * @param row - Row.
 * @returns pinned cell and index tuple.
 */
function getPinnedCellIndex<T>(row: Row<T>): PinnedCell<T> {
  const visibleCells = row.getVisibleCells();
  let pinnedIndex = 0;
  for (let i = 0; i < visibleCells.length; i++) {
    if (visibleCells[i].column.columnDef.meta?.columnPinned) {
      pinnedIndex = i;
      break;
    }
  }
  return [visibleCells[pinnedIndex], pinnedIndex];
}
