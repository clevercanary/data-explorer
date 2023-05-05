import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { NTag } from "./nTag";

const meta: Meta<typeof NTag> = {
  component: NTag,
  title: "Components/Table/Cell/NTag",
};

export default meta;
type Story = StoryObj<typeof NTag>;

export const Default: Story = {
  args: {
    Tag: <div>Tag</div>,
    TooltipTitle: <div>Tooltip Title</div>,
  },
};
