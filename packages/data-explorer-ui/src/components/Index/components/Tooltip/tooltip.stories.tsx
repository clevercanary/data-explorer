import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Tooltip } from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  argTypes: {
    arrow: { control: "boolean" },
    children: { control: false },
  },
  component: Tooltip,
  title: "Components/Common/Tooltip",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TooltipStory: Story = {
  args: {
    children: <>Text with tooltip</>,
    title: "Tooltip for text",
  },
};
