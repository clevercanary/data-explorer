import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "./button";
import {
  ButtonPrimary,
  ButtonSecondary,
  TextButtonWhite,
} from "./button.styles";

const meta = {
  argTypes: {
    children: { control: "text" },
  },
  component: Button,
  parameters: {
    layout: "centered",
  },
  title: "Components/Common/Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryButtonStory: Story = {
  args: {
    children: "Primary Button",
  },
  render: (args) => <ButtonPrimary {...args} />,
};

export const SecondaryButtonStory: Story = {
  args: {
    children: "Secondary Button",
  },
  render: (args) => <ButtonSecondary {...args} />,
};

export const TextButtonWhiteStory: Story = {
  args: {
    children: "Click here",
  },
  render: (args) => <TextButtonWhite {...args} />,
};
