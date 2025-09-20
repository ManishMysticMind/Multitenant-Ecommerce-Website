import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SectionTitle, { TitleProps } from "../components/ui/common/SectionTitle";

export default {
  title: "Components/SectionTitle",
  component: SectionTitle,
  argTypes: {

    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    textalign: {
        control: { type: "select" },
        options: ["center", "start", "end" , "justify" ,"left" ,"right" ],
      },
    label: { control: "text" },
  },
} as Meta<TitleProps>;

const Template: StoryFn<TitleProps> = (args: any) => <SectionTitle {...args} />;

export const Type1 = Template.bind({});
Type1.args = {
  label: "Type 1",
  size: "md",
  textalign:"start"
};

export const Type2 = Template.bind({});
Type2.args = {
  label: "Type 2",
  size: "md",
  textalign:"center"
};

