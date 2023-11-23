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
import { TEXT_BODY_SMALL_400 } from "../../../../theme/common/typography";
import { CheckedIcon } from "../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";

interface Props {
  categoryKey: CategoryKey;
  categorySection?: string;
  listItem: SelectCategoryValueView;
  onFilter: OnFilterFn;
  onUpdateItemSizeByItemKey: (itemKey: string, itemSize: number) => void;
  style: CSSProperties;
}

export default function VariableSizeListItem({
  categoryKey,
  categorySection,
  listItem,
  onFilter,
  onUpdateItemSizeByItemKey,
  style,
}: Props): JSX.Element {
  const listItemRef = useRef<HTMLDivElement>(null);
  const { count, key, label, selected } = listItem;
  delete style.height; // Remove height style to allow variable size list to set item height.

  // Sets map of list item key to its height.
  useEffect(() => {
    onUpdateItemSizeByItemKey(key, listItemRef.current?.clientHeight || 0);
  }, [key, onUpdateItemSizeByItemKey]);

  const handleItemClicked = (): void => {
    onFilter(categoryKey, key, !selected, categorySection);
  };

  return (
    <ListItemButton
      ref={listItemRef}
      onClick={handleItemClicked}
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
          <Typography color="ink.light" variant={TEXT_BODY_SMALL_400}>
            {count}
          </Typography>
        }
      />
    </ListItemButton>
  );
}
