import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import logo from "../../../../images/logo.svg";
import { SOCIAL } from "../../../common/Socials/socials";
import { Logo } from "../Header/components/Content/components/Logo/logo";
import { Footer } from "./footer";

export default {
  argTypes: {
    footer: {
      feedbackForm: { control: "boolean" },
      logos: { control: "array" },
      navLinks: { control: "array" },
      socials: { control: "array" },
    },
  },
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Layout/Footer",
} as ComponentMeta<typeof Footer>;

const FooterTemplate: ComponentStory<typeof Footer> = (args) => (
  <Footer {...args} />
);

export const FooterStory = FooterTemplate.bind({});
FooterStory.args = {
  Branding: <Logo alt="logo" height={24} link={"/"} src={logo} />,
  navLinks: [
    {
      label: "Help",
      url: "https://support.google.com/",
    },
    {
      label: "Privacy",
      url: "https://policies.google.com/privacy?hl=en-US",
    },
  ],
  socials: [
    {
      ...SOCIAL.DISCOURSE,
      url: "https://www.discourse.org/",
    },
    {
      ...SOCIAL.TWITTER,
      url: "https://twitter.com",
    },
    {
      ...SOCIAL.YOUTUBE,
      url: "https://www.youtube.com",
    },
    {
      ...SOCIAL.GITHUB,
      url: "https://github.com",
    },
  ],
};
