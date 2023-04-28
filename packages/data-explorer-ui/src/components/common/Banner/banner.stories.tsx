import { Typography } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { CallToActionButtonWithCustomReactComponentStory as CallToActionButton } from "../Button/components/CallToActionButton/callToActionButton.stories";
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

const BannerTemplate: StoryFn<typeof Banner> = (args) => <Banner {...args} />;

export const BannerStory = BannerTemplate.bind({});
BannerStory.args = {
  children: (
    <>
      <Typography component="span" variant="text-body-small-500">
        Optional announcements text goes here followed by a
      </Typography>{" "}
      <CallToActionButton
        ButtonElType={CallToActionButton.args?.ButtonElType}
        callToAction={
          CallToActionButton.args?.callToAction || {
            label: "Call to Action",
            url: "https://www.google.com",
          }
        }
      />
    </>
  ),
};

export const BannerWithoutCallToActionTextStory = BannerTemplate.bind({});
BannerWithoutCallToActionTextStory.args = {
  children: (
    <>
      <Typography component="span" variant="text-body-small-500">
        Optional announcements text goes here
      </Typography>{" "}
    </>
  ),
};
