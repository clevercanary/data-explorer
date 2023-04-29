import { Meta, StoryObj } from "@storybook/react";
import { Title } from "./title";

const meta: Meta<typeof Title> = {
  component: Title,
  title: "Components/Common/Title",
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {
    title: "The Great Extravaganza: A Showcase of Awesome",
  },
};
