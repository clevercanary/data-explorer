import { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta = {
  argTypes: {
    StartAdornment: {
      description:
        "Start Adornment. Prop fontSize='small' will be added to element.",
    },
    searchTerm: {
      description: "Value of input",
    },
    setSearchTerm: {
      description: "Callback to update value of input",
    },
  },
  component: Input,
  title: "Components/Common/Input",
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputStory: Story = {
  args: {
    searchTerm: "Entered text",
  },
};
