import type { Meta, StoryObj } from "@storybook/react";

import { EntityViewToggle } from "./entityViewToggle";

const meta: Meta<typeof EntityViewToggle> = {
  component: EntityViewToggle,
  title: "Components/Table/Components/EntityViewToggle",
};

export default meta;
type Story = StoryObj<typeof EntityViewToggle>;

export const Default: Story = {};
