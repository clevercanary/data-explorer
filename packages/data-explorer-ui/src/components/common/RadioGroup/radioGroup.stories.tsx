import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { RadioGroup } from "./radioGroup";

export default {
  argTypes: {
    children: { control: { disabled: true } },
    onRadioChange: { action: "onRadioChange" },
  },
  component: RadioGroup,
  title: "Components/Common/RadioGroup",
} as Meta<typeof RadioGroup>;

const RadioGroupTemplate: StoryFn<typeof RadioGroup> = (args) => (
  <RadioGroup {...args} />
);

export const RadioGroupStory = RadioGroupTemplate.bind({});
RadioGroupStory.args = {
  radios: [
    {
      disabled: false,
      label: "Radio 1",
      value: "radio1",
    },
    {
      disabled: false,
      label: "Radio 2",
      value: "radio2",
    },
    {
      disabled: false,
      label: "Radio 3",
      value: "radio3",
    },
    {
      disabled: true,
      label: "Radio 4",
      value: "radio4",
    },
  ],
  value: "radio1",
};
