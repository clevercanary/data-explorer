import { Button, Typography } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TextButtonWhiteStory } from "../Button/button.stories";
import { CallToActionButtonStory } from "../Button/components/CallToActionButton/callToActionButton.stories";
import { Banner } from "./banner.styles";

export default {
  argTypes: {
    children: { control: { disabled: true } },
  },
  component: Banner,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Common/Banner",
} as Meta<typeof Banner>;

type Story = StoryObj<typeof Button>;

export const BannerStory: Story = {
  render: () => (
    <Banner>
      <Typography component="span" variant="text-body-small-400">
        Optional announcements text goes here followed by a{" "}
        <CallToActionButtonStory
          ButtonElType={TextButtonWhiteStory}
          callToAction={{
            label: "Call to Action",
            url: "https://www.google.com",
          }}
        />
      </Typography>
    </Banner>
  ),
};

export const BannerStoryWithoutCallToAction: Story = {
  render: () => (
    <Banner>
      <Typography component="span" variant="text-body-small-400">
        Optional announcements text goes here
      </Typography>
    </Banner>
  ),
};
