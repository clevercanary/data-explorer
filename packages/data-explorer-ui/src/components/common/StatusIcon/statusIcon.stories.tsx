import { Meta, StoryObj } from "@storybook/react";
import { SearchOffIcon } from "../CustomIcon/components/SearchOffIcon/searchOffIcon";
import { PRIORITY, StatusIcon } from "./statusIcon";

const meta: Meta<typeof StatusIcon> = {
  argTypes: {
    StatusIcon: { control: { disable: true } },
    priority: { control: "select", options: Array.from(Object.keys(PRIORITY)) },
  },
  component: StatusIcon,
  title: "Components/Common/Alert/StatusIcon",
};

export default meta;
type Story = StoryObj<typeof StatusIcon>;

export const Default: Story = {
  args: {
    StatusIcon: SearchOffIcon,
    priority: PRIORITY.LOW,
  },
};
