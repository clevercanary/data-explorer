import { Meta, StoryObj } from "@storybook/react";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { CallToAction, CallToActionButton } from "./callToActionButton";

const meta = {
  argTypes: {
    children: { control: { disabled: true } },
  },
  component: CallToActionButton,
  title: "Components/Common/CallToActionButton",
} as Meta<typeof CallToActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const callToAction: CallToAction = {
  label: "Click here",
  target: ANCHOR_TARGET.BLANK,
  url: "https://www.google.com",
};

export const CallToActionButtonStory: Story = {
  args: {
    callToAction,
    disabled: false,
  },
};
