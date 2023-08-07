import { PaperProps, PopperProps } from "@mui/material";
import { DividerItem, ITEM_TYPE, NoResultsItem } from "./entites";

export const DEFAULT_LIST_HEIGHT = 0;

export const DIVIDER_HEIGHT = 17;

export const PAPER_PROPS: Partial<PaperProps> = {
  sx: {
    width: 368,
  },
  variant: "menu",
};
export const POPPER_PROPS: Partial<PopperProps> = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 8],
      },
    },
  ],
  placement: "bottom-start",
};

export const DIVIDER_ITEM: DividerItem = {
  type: ITEM_TYPE.DIVIDER,
};

export const NO_RESULTS_ITEM: NoResultsItem = {
  key: "noResults",
  type: ITEM_TYPE.NO_RESULTS,
};
