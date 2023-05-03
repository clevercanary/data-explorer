import { Meta, StoryObj } from "@storybook/react";
import { NavLinkDropdownButton } from "./navLinkDropdownButton";

const meta = {
  argTypes: {
    children: { control: "text" },
  },
  component: NavLinkDropdownButton,
  title: "Components/Common/Button",
} satisfies Meta<typeof NavLinkDropdownButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavDropdownButtonStory: Story = {
  args: {
    children: "More",
    isActive: true,
  },
};
