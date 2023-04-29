import { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./tabs";

const meta: Meta<typeof Tabs> = {
  argTypes: {
    children: { control: { disabled: true } },
    onTabChange: { action: "onTabChange" },
    parameters: {
      layout: "fullscreen",
    },
  },
  component: Tabs,
  title: "Components/Common/Tabs",
} as Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Tags: Story = {
  args: {
    tabs: [
      {
        label: "Tab 1",
        value: "tab1",
      },
      {
        label: "Tab 2",
        value: "tab2",
      },
      {
        label: "Tab 3",
        value: "tab3",
      },
      {
        label: "Tab 4",
        value: "tab4",
      },
    ],
    value: "tab1",
  },
};
