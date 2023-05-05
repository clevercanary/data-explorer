import { Meta, StoryObj } from "@storybook/react";
import { Link } from "./link";

const meta: Meta<typeof Link> = {
  argTypes: {
    copyable: { control: "boolean" },
    noWrap: { control: "boolean" },
  },
  component: Link,
  title: "Components/Links/Link",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LinkStory: Story = {
  args: {
    label: "Click me",
    url: "#",
  },
};
