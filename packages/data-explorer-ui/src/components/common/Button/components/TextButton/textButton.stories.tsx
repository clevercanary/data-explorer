import type { Meta, StoryObj } from "@storybook/react";

import React from "react";
import { TextButton } from "./textButton";

const meta: Meta<typeof TextButton> = {
  component: TextButton,
  title: "components/common/Button/components/TextButton",
};

export default meta;
type Story = StoryObj<typeof TextButton>;

export const Default: Story = {
  render: () => <TextButton>TextButton</TextButton>,
};
