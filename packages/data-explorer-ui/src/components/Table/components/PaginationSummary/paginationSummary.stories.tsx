import type { Meta, StoryObj } from "@storybook/react";

import { PaginationSummary } from "./paginationSummary";

const meta: Meta<typeof PaginationSummary> = {
  component: PaginationSummary,
  title: "Components/Table/Components/PaginationSummary",
};

export default meta;
type Story = StoryObj<typeof PaginationSummary>;

export const Default: Story = {
  args: {
    firstResult: 1,
    lastResult: 10,
    totalResult: 100,
  },
};
