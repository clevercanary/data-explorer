import type { Meta, StoryObj } from "@storybook/react";

import { Cell } from "./cell";

const meta: Meta<typeof Cell> = {
  component: Cell,
  title: "Components/Table/Components/Cell",
};

export default meta;
type Story = StoryObj<typeof Cell>;

export const String: Story = {
  args: {
    value: "String",
  },
};

export const Number: Story = {
  args: {
    value: 1,
  },
};

export const StringArray: Story = {
  args: {
    value: ["String", "Array"],
  },
};

export const Unspecified: Story = {
  args: {
    value: undefined,
  },
};
