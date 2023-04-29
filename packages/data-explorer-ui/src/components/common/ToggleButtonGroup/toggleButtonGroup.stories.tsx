import { Meta, StoryObj } from "@storybook/react";
import { ToggleButtonGroup } from "./toggleButtonGroup";

const meta: Meta<typeof ToggleButtonGroup> = {
  argTypes: {
    toggleButtons: { table: { disable: true } },
  },
  component: ToggleButtonGroup,
  parameters: {
    layout: "centered",
  },
  title: "Components/Common/ButtonGroup",
};

export default meta;
type Story = StoryObj<typeof ToggleButtonGroup>;

export const Default: Story = {
  args: {
    toggleButtons: [
      {
        label: "Exact Match (243)",
        onToggle: (): void => {
          // onToggle function
        },
        value: "exact-match",
      },
      {
        label: "Related (33)",
        onToggle: (): void => {
          // onToggle function
        },
        value: "related-match",
      },
    ],
  },
};
