import { Meta, StoryObj } from "@storybook/react";
import { LoginButton } from "./loginButton.styles";

const meta = {
  argTypes: {
    children: { control: "text" },
  },
  component: LoginButton,
  title: "Components/Common/Button",
} satisfies Meta<typeof LoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginButtonStory: Story = {
  args: {
    children: "Login button",
  },
};
