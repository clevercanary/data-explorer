import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { CustomIcon } from "./customIcon";

export default {
  argTypes: {
    iconName: {
      description: "Name of the icon",
    },
  },
  component: CustomIcon,
  title: "Components/Common/CustomIcon",
} satisfies Meta<typeof CustomIcon>;

const CustomIconTemplate: StoryFn<typeof CustomIcon> = (args) => (
  <CustomIcon {...args} />
);

export const CustomIconStory = CustomIconTemplate.bind({});
CustomIconStory.args = {
  iconName: "github",
  titleAccess: "Github icon",
};
