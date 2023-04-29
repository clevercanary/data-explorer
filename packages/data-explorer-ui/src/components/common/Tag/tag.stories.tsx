import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Tag } from "./tag";
import { TagDefault, TagWarning } from "./tag.styles";

const meta: Meta<typeof Tag> = {
  argTypes: {
    children: { type: "string" },
  },
  component: Tag,
  title: "Components/Common/Alert/Tag",
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: "Default",
  },
  render: ({ children }) => <TagDefault>{children}</TagDefault>,
};

export const Warning: Story = {
  args: {
    children: "Warning",
  },
  render: ({ children }) => <TagWarning>{children}</TagWarning>,
};
