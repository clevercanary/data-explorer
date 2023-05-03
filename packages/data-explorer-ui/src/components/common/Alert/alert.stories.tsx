import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Alert } from "./alert";

export default {
  argTypes: {
    children: {
      control: "text",
      description: "Inner text",
    },
    color: {
      description: "Color of alert",
    },
    icon: {
      control: "text",
      description: "Top left icon. If provided will replace severity.",
    },
    severity: {
      description: "Top left predefined icon. Combine with color.",
    },
    title: {
      control: "text",
      description: "Highlighted text",
    },
    // TODO: at the moment "banner" | "neutral" are not included in variants, because doc generator ignores custom d.ts overrides
    variant: {
      description: "Type of the alert",
    },
  },
  component: Alert,
  title: "Components/Common/Alert",
} satisfies ComponentMeta<typeof Alert>;

const AlertTemplate: ComponentStory<typeof Alert> = (args) => (
  <Alert {...args} />
);

export const AlertStory = AlertTemplate.bind({});
AlertStory.args = {
  children: "Something certainly happened",
  color: "warning",
  severity: "warning",
  title: "Ouch!",
};
