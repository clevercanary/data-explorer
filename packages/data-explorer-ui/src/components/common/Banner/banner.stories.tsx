import { Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { CallToActionButton } from "../Button/components/CallToActionButton/callToActionButton";
import { Banner } from "./banner";
import { BannerPrimary } from "./banner.styles";

export default {
  argTypes: {
    children: { control: { disabled: true } },
  },
  component: Banner,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Common/Banner",
} as ComponentMeta<typeof Banner>;

const BannerPrimaryTemplate: ComponentStory<typeof Banner> = (args) => (
  <BannerPrimary {...args} />
);

export const BannerPrimaryStory = BannerPrimaryTemplate.bind({});
BannerPrimaryStory.args = {
  children: (
    <>
      <Typography component="span" variant="text-body-small-500">
        Optional announcements text goes here followed by a
      </Typography>{" "}
      <CallToActionButton
        ButtonElType={"TextButtonWhite"}
        callToAction={{
          label: "Call to Action",
          url: "https://www.google.com",
        }}
      />
    </>
  ),
};

export const BannerPrimaryWithoutCallToActionTextStory =
  BannerPrimaryTemplate.bind({});
BannerPrimaryWithoutCallToActionTextStory.args = {
  children: (
    <>
      <Typography component="span" variant="text-body-small-500">
        Optional announcements text goes here
      </Typography>{" "}
    </>
  ),
};
