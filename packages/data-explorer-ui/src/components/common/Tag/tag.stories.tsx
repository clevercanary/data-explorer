import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { Tag } from "./tag";
import { TagWarning } from "./tag.styles";

export default {
  argTypes: {
    children: { control: { disabled: true } },
  },
  component: Tag,
  title: "Components/Common/Alert/Tag",
} as Meta<typeof Tag>;

const WarningTagTemplate: StoryFn<typeof Tag> = (args) => (
  <TagWarning {...args}>{args.children}</TagWarning>
);

export const WarningTagStory = WarningTagTemplate.bind({});
WarningTagStory.args = {
  children: "Please note",
};
