import { Meta, StoryObj } from "@storybook/react";
import { LoginNotice } from "./loginNotice";

const meta: Meta<typeof LoginNotice> = {
  component: LoginNotice,
  title: "Components/Login/LoginNotice",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginNoticeStory: Story = {
  args: {
    conditionsUrl: "https://website.com/conditions",
    privacyUrl: "https://website.com/privacy",
  },
};
