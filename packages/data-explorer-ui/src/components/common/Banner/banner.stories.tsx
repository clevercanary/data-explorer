import { Typography } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CallToActionButtonStory } from "../Button/components/CallToActionButton/callToActionButton.stories";
import { TextButton } from "../Button/components/TextButton/textButton";
import { Banner } from "./banner";

export default {
  argTypes: {
    children: { table: { disable: true } },
  },
  component: Banner,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Common/Banner",
} as Meta<typeof Banner>;

type Story = StoryObj<typeof Banner>;

export const BannerStory: Story = {
  args: {
    children: (
      <Typography component="span" variant="text-body-small-400">
        Optional announcements text goes here followed by a{" "}
        <CallToActionButtonStory
          ButtonElType={TextButton}
          callToAction={{
            label: "Call to Action",
            url: "https://www.google.com",
          }}
        />
      </Typography>
    ),
  },
};

export const BannerStoryWithoutCallToAction: Story = {
  args: {
    children: (
      <Typography component="span" variant="text-body-small-400">
        Optional announcements text goes here
      </Typography>
    ),
  },
};
