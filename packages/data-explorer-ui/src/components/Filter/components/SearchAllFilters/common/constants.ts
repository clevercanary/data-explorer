import { PaperProps, PopperProps } from "@mui/material";

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
