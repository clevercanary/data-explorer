import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AuthenticationMenu } from "./authenticationMenu";

export default {
  argTypes: {
    menuPosition: {
      description: "Defines direction where menu grows",
    },
    onLogout: {
      description: "Callback to be called when 'Logout' button is clicked",
    },
    userProfile: {
      description: "User profile with name and avatar",
    },
  },
  component: AuthenticationMenu,
  title: "Components/Navigation/AuthenticationMenu",
} satisfies ComponentMeta<typeof AuthenticationMenu>;

const AuthenticationMenuTemplate: ComponentStory<typeof AuthenticationMenu> = (
  args
) => <AuthenticationMenu {...args} />;

export const AuthenticationMenuStory = AuthenticationMenuTemplate.bind({});
AuthenticationMenuStory.args = {
  userProfile: {
    email: "john@smith.com",
    email_verified: true,
    family_name: "Smith",
    given_name: "John",
    hd: "",
    locale: "",
    name: "john_smith",
    picture: "https://i.pravatar.cc/200",
    sub: "",
  },
};
