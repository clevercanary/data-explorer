import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Alert } from "./alert";

export default {
  argTypes: {
    children: { control: "text" },
    icon: { control: "text" },
    title: { control: "text" },
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
