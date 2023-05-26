import { Meta, StoryObj } from "@storybook/react";
import { Support } from "./support";

export default {
  component: Support,
  title: "Components/Communication/Support",
} as Meta<typeof Support>;

type Story = StoryObj<typeof Support>;

export const SupportStory: Story = {
  args: {
    url: "https://anvilproject.org/help",
  },
};
