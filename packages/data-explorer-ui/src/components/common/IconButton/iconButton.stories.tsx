import { Meta, StoryObj } from "@storybook/react";
import { ErrorIcon } from "../CustomIcon/components/ErrorIcon/errorIcon";
import { InfoIcon } from "../CustomIcon/components/InfoIcon/infoIcon";
import { SearchIcon } from "../CustomIcon/components/SearchIcon/searchIcon";
import { IconButton } from "./iconButton";

const meta = {
  argTypes: {
    Icon: {
      description: "Icon element",
      mapping: {
        Error: ErrorIcon,
        Info: InfoIcon,
        Search: SearchIcon,
      },
      options: ["Error", "Info", "Search"],
    },
    disabled: {
      control: "boolean",
    },
  },
  component: IconButton,
  title: "Components/Common/IconButton",
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconButtonStory: Story = {
  args: {
    Icon: InfoIcon,
  },
};
