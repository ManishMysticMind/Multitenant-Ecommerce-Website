import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import ProductStockProgressBar from "../components/ui/Products/ProductStockProgressBar";
import { TStockProgressBarProps } from "../lib/types";

export default {
  title: "Components/Products/ProgressBar",
  component: ProductStockProgressBar,
  argTypes: {
    soldStock: {
      control: "number",
      description: "Sold stock quantity",
    },
    totalStock: {
      control: "number",
      description: "Total stock quantity",
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "warning", "default"],
      description: "The color variant of the progress bar",
    },
  },
} as Meta<typeof ProductStockProgressBar>;

const Template: StoryFn<TStockProgressBarProps> = (args) =>
  <div style={{ width: '300px', height: '400px' }}>
    <ProductStockProgressBar {...args} />
  </div>
  ;

export const Default = Template.bind({});
Default.args = {
  soldStock: 60,
  totalStock: 203,
  variant: "warning",
};
