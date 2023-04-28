import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { Error as ErrorComponent } from "./error";

export default {
  component: ErrorComponent,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Communication",
} as Meta<typeof ErrorComponent>;

const Template: StoryFn<typeof ErrorComponent> = (args) => (
  <ErrorComponent {...args} />
);

export const ClientSideError = Template.bind({});
ClientSideError.args = {};
