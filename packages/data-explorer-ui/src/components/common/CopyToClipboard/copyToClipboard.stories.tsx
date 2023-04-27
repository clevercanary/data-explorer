import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { CopyToClipboard } from "./copyToClipboard";

export default {
  argTypes: {
    copyStr: {
      description: "String to be copied",
    },
  },
  component: CopyToClipboard,
  title: "Components/Common/CopyToClipboard",
} satisfies ComponentMeta<typeof CopyToClipboard>;

const CopyToClipboardTemplate: ComponentStory<typeof CopyToClipboard> = (
  args
) => <CopyToClipboard {...args} />;

export const CopyToClipboardStory = CopyToClipboardTemplate.bind({});
CopyToClipboardStory.args = {
  copyStr: "Copy me",
};
