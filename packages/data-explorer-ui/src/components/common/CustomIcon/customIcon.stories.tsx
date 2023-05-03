import { Meta, StoryObj } from "@storybook/react";
import { CustomIcon } from "./customIcon";

const meta = {
  argTypes: {
    iconName: {
      description: "Name of the icon",
    },
  },
  component: CustomIcon,
  title: "Components/Common/CustomIcon",
} satisfies Meta<typeof CustomIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CustomIconStory: Story = {
  args: {
    iconName: "github",
    titleAccess: "Github icon",
  },
};
