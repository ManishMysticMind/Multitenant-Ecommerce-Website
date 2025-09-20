import { Meta, StoryFn } from "@storybook/react";
import ProductCard from "../components/ui/Products/ProductCard";
import { TProductDetail } from "../lib/types";

export default {
  title: "Components/Products/ProductCard",
  component: ProductCard,
  argTypes: {
    discount: {
      control: "text",
      description: "Discount label for the product",
    },
    productImage: {
      control: "text",
      description: "Image URL for the product",
    },
    label: {
      control: "text",
      description: "Product name or title",
    },
    code: {
      control: "text",
      description: "Product code for identification",
    },
    price: {
      control: "text",
      description: "Current price of the product",
    },
    previousPrice: {
      control: "text",
      description: "Previous price of the product (if on discount)",
    },
    rating: {
      control: "number",
      description: "Rating of the product out of 5",
      min: 0,
      max: 5,
      step: 0.1,
    },
    review: {
      control: "text",
      description: "Number of reviews for the product",
    },
    borderRight: {
      control: "radio",
      options: ["true", "false"],
      description: "Whether the product card has a border on the right",
    },
  },
} as Meta<typeof ProductCard>;

const Template: StoryFn<TProductDetail> = (args) => (
  <div style={{ width: "300px", height: "400px" }}>
    <ProductCard data={args} />
  </div>
);

export const Product = Template.bind({});
