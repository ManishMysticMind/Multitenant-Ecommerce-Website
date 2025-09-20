import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Button from "../components/ui/common/Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    varient: {
      control: { type: "select" },
      options: ["primary", "secondary", "default"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    label: { control: "text" },
    borderradius: { control: "text" },
    width: { control: "text" },
    onClick: { action: "clicked" },
  },
} as Meta<typeof Button>;

const ButtonTemplate: StoryFn<typeof Button> = (args: any) => <Button {...args} />;

export const Primary = ButtonTemplate.bind({});
Primary.args = {
  label: "Primary Button",
  varient: "primary",
  size: "md",
  width: "160px",
  borderradius: "8px",
};

export const Secondary = ButtonTemplate.bind({});
Secondary.args = {
  label: "Secondary Button",
  varient: "secondary",
  size: "md",
  width: "160px",
  borderradius: "8px",
};

export const Default = ButtonTemplate.bind({});
Default.args = {
  label: "Default Button",
  varient: undefined,
  size: "md",
  borderradius: "8px",
  width: "160px",
  

};
