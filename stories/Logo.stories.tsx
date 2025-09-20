import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Logo from "../components/ui/common/Logo"; // Adjust the path to match your project structure.

export default {
  title: "Components/Logo",
  component: Logo,
  argTypes: {
    src: {
      control: "text",
      description: "The source URL for the logo image.",
    },
    width: {
      control: { type: "number" },
      description: "The width of the logo image.",
      defaultValue: 203,
    },
    height: {
      control: { type: "number" },
      description: "The height of the logo image.",
      defaultValue: 62,
    },
  },
} as Meta<typeof Logo>;

const Template: StoryFn<typeof Logo> = (args) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "/Logo.png",
  width: 203,
  height: 62,
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  src: "/Logo.png",
  width: 150,
  height: 50,
};

export const LargeLogo = Template.bind({});
LargeLogo.args = {
  src: "/Logo.png",
  width: 400,
  height: 120,
};
