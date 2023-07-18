import {
  Checkbox,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { CSSProperties, useEffect, useRef } from "react";
import {
  CategoryKey,
  SelectCategoryValueView,
} from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { CheckedIcon } from "../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";

interface Props {
  categoryKey: CategoryKey;
  listItem: SelectCategoryValueView;
  onFilter: OnFilterFn;
  setItemSizeByItemKey: (itemKey: string, itemSize: number) => void;
  style: CSSProperties;
}

export default function VariableSizeListItem({
  categoryKey,
  listItem,
  onFilter,
  setItemSizeByItemKey,
  style,
}: Props): JSX.Element {
  const listItemRef = useRef<HTMLDivElement>(null);
  const { count, key, label, selected } = listItem;
  delete style.height; // Remove height style to allow variable size list to set item height.

  // Sets map of menu item key to its height.
  useEffect(() => {
    if (listItemRef.current) {
      setItemSizeByItemKey(key, listItemRef.current.clientHeight);
    }
  }, [key, setItemSizeByItemKey]);

  return (
    <ListItemButton
      ref={listItemRef}
      onClick={(): void => onFilter(categoryKey, key, !selected)}
      selected={selected}
      style={style}
    >
      <Checkbox
        checked={selected}
        checkedIcon={<CheckedIcon />}
        icon={<UncheckedIcon />}
      />
      <ListItemText
        disableTypography
        primary={<span>{label}</span>}
        secondary={
          <Typography color="inkLight" variant="text-body-small-400">
            {count}
          </Typography>
        }
      />
    </ListItemButton>
  );
}
