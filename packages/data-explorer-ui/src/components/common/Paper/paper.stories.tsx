import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Paper } from "./paper";

const meta = {
  argTypes: {
    children: { control: false },
    variant: {
      description: "Style of paper",
    },
  },
  component: Paper,
  title: "Components/Common/Paper",
} satisfies Meta<typeof Paper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaperStory: Story = {
  args: { children: <div style={{ padding: "50px" }}></div> },
};
