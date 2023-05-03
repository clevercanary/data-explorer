import { Meta, StoryObj } from "@storybook/react";
import { Dot } from "./dot";

const meta = {
  component: Dot,
  title: "Components/Common/Dot",
} satisfies Meta<typeof Dot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DotStory: Story = {};
