import { Meta, StoryObj } from "@storybook/react";
import { DropdownButton } from "./dropdownButton.styles";

const meta = {
  argTypes: {
    children: { control: "text" },
  },
  component: DropdownButton,
  title: "Components/Common/Button",
} satisfies Meta<typeof DropdownButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownButtonStory: Story = {
  args: {
    children: "Dropdown button",
  },
};
