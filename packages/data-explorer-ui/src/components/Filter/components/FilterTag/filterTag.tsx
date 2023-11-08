import { CloseRounded } from "@mui/icons-material";
import { Chip, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { SupersededTag } from "./filterTag.styles";

export interface FilterTagProps {
  label: string;
  onRemove: () => void;
  superseded: boolean;
}

const DEFAULT_SLOT_PROPS = {
  popper: {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, -6],
        },
      },
    ],
  },
};

export const FilterTag = ({
  label,
  onRemove,
  superseded,
}: FilterTagProps): JSX.Element => {
  const Tag = superseded ? SupersededTag : Chip;
  const tagRef = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);
  useEffect(() => {
    const tagLabelElement =
      tagRef.current?.querySelector<HTMLElement>(".MuiChip-label");
    if (!tagLabelElement) return;
    setIsOverflowed(tagLabelElement.offsetWidth < tagLabelElement.scrollWidth);
  }, []);
  return (
    <Tooltip
      arrow
      disableInteractive
      placement="top"
      slotProps={DEFAULT_SLOT_PROPS}
      title={isOverflowed ? label : null}
    >
      <Tag
        clickable={false} // removes unwanted active and hover ui; "pointer" cursor added to "filterTag" variant in theme.
        color="primary"
        deleteIcon={<CloseRounded color="inherit" />}
        label={label}
        onClick={onRemove}
        onDelete={onRemove}
        ref={tagRef}
        variant="filterTag"
      />
    </Tooltip>
  );
};
