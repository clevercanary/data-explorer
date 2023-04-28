import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { STATUS, StatusBadge } from "./statusBadge";

export default {
  argTypes: {
    status: { control: "select", options: Array.from(Object.keys(STATUS)) },
  },
  component: StatusBadge,
  title: "Components/Common/Alert",
} as Meta<typeof StatusBadge>;

const StatusBadgeTemplate: StoryFn<typeof StatusBadge> = (args) => (
  <StatusBadge {...args} />
);

export const StatusBadgeStory = StatusBadgeTemplate.bind({});
StatusBadgeStory.args = {
  status: STATUS.NEW,
};
