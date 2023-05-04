import { Meta, StoryObj } from "@storybook/react";
import { CustomIcon } from "./customIcon";

const meta = {
  argTypes: {
    htmlColor: {
      control: "color",
      description: `Applies a color attribute to the SVG element when color is "inherit" or "undefined".`,
    },
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
