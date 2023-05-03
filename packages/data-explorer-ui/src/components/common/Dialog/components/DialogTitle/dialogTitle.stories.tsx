import { Meta, StoryObj } from "@storybook/react";
import { DialogTitle } from "./dialogTitle";

const meta = {
  argTypes: {
    onClose: { description: "Callback to be called when user clicks X" },
    title: { control: "text", description: "Title of dialog" },
  },
  component: DialogTitle,
  title: "Components/Common/Dialog",
} satisfies Meta<typeof DialogTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogTitleStory: Story = {
  args: {
    title: "Dialog title",
  },
};
