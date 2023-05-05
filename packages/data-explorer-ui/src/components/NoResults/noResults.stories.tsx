import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ButtonPrimary, ButtonSecondary } from "../common/Button/button.styles";
import { NoResults } from "./noResults";

const meta: Meta<typeof NoResults> = {
  argTypes: {
    actions: { control: { disabled: true } },
    description: { control: "text" },
    title: { control: "text" },
  },
  component: NoResults,
  title: "Components/Communication/NoResults",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NoResultsStory: Story = {
  args: {
    actions: (
      <>
        <ButtonPrimary>Remove last filter</ButtonPrimary>
        <ButtonSecondary>Clear all filters</ButtonSecondary>
      </>
    ),
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
    title: "No Results found",
  },
};
