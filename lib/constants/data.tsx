import { IoBoatOutline } from "react-icons/io5";
import { LiaMoneyCheckSolid } from "react-icons/lia";
import { RiCustomerService2Line, RiDiscountPercentLine } from "react-icons/ri";

import { TOrder, TReviewDetail } from "../types";
import {
  BuyerResource,
  DiscountProductDetail,
  InformationList,
  TCountDown,
  TFeatureDetail,
} from "../types/components";

export enum DashboardPageRoutes {
  LOGIN = "/login",
  REGISTER = "/signup",
  FORGET_PASSWORD = "/forgot-password",
  DASHBOARD = "/dashboard/home",
  HOME = "/",
  PROFILE = "/dashboard/profile",
  ANALYTICS = "/dashboard/analytics",
  EVENTS = "dashboard/events",
  ATTENDEES = "dashboard/attendees",
  ADVERTISEMENTS = "dashboard/advertisements",
  GIVEAWAYS = "dashboard/exclusive-deal",
  SETTINGS = "dashboard/settings",
  HELP = "dashboard/help",
}

export const featuretype: TFeatureDetail[] = [
  {
    id: 1,
    icon: <IoBoatOutline />,
    title: "Free Delivery",
    description: "Free shipping on all order",
  },
  {
    id: 2,
    icon: <RiCustomerService2Line />,
    title: "Online Support 24/7",
    description: "Support online 24 hours a day",
  },
  {
    id: 3,
    icon: <LiaMoneyCheckSolid />,
    title: "Money Return",
    description: "Back guarantee under 7 days",
  },
  {
    id: 4,
    icon: <RiDiscountPercentLine />,
    title: "Member Discount",
    description: "Onevery order over $120.00",
  },
];

export const buyerResource: BuyerResource[] = [
  {
    id: 1,
    title: "Sign in",
    redirect: "/signup",
  },
  {
    id: 2,
    title: "Buyer Protection",
    redirect: "/",
  },
  {
    id: 3,
    title: "Payment Option",
    redirect: "/",
  },
  {
    id: 4,
    title: "Shipping Policy",
    redirect: "/shipping-policy",
  },
  {
    id: 5,
    title: "Return Policy",
    redirect: "/",
  },
];

export const informationList: InformationList[] = [
  {
    id: 1,
    title: "About Us",
    redirect: "/about",
  },
  {
    id: 2,
    title: "Privacy Policy",
    redirect: "/privacy-policy",
  },
  {
    id: 3,
    title: "Shipping Policy",
    redirect: "/shipping-policy",
  },
  {
    id: 4,
    title: "Blog",
    redirect: "/blog",
  },
  {
    id: 5,
    title: "Contact Us",
    redirect: "/contact",
  },
];

export const discountProductList: DiscountProductDetail[] = [
  {
    id: 1,
    image: "/images/discountproduct/discount1.png",
    description: "Upto -70% Off",
    title: "SonicFuel Wireless",
    size: "md",
  },
  {
    id: 2,
    image: "/images/discountproduct/discount2.png",
    description: "Upto -50% Off",
    title: "Men's Cycling Underwear",
    size: "lg",
  },
  {
    id: 3,
    image: "/images/discountproduct/discount3.png",
    description: "Upto -70% Off",
    title: "SonicFuel Wireless",
    size: "sm",
  },
];

export const CountdownList: TCountDown[] = [
  {
    id: 1,
    time: 21,
    hour: "HOURS",
  },
  {
    id: 2,
    time: 50,
    hour: "MINS",
  },
  {
    id: 3,
    time: 39,
    hour: "SECS",
  },
];

export const OrderProductList: TOrder[] = [
  {
    id: 1,
    store_name: "Store Name",
    image: "/order.png",
    name: "Product Name",
    brand: "Brand",
    size: "Size",
    color: "Color",
    quantity: "01",
    status: "Completed",
    price: "$499.99",
  },
  {
    id: 2,
    store_name: "Store Name",
    image: "/order.png",
    name: "Product Name",
    brand: "Brand",
    size: "Size",
    color: "Color",
    quantity: "01",
    status: "Cancelled",
    price: "$499.99",
  },
  {
    id: 3,
    store_name: "Store Name",
    image: "/order.png",
    name: "Product Name",
    brand: "Brand",
    size: "Size",
    color: "Color",
    quantity: "01",
    status: "Completed",
    price: "$499.99",
  },
];

export const ReviewList: TReviewDetail[] = [
  {
    id: 1,
    image: "/reviewImage.png",
    name: "Product Name",
    brand: "Brand",
    size: "Size",
    color: "Color",
    rating: 5,
    description:
      "“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt antium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim”",
    thumbnail_1: "/thumbnail1.png",
    thumbnail_2: "/thumbnail2.png",
    thumbnail_3: "/thumbnail3.png",
    purchase_date: "15 May, 2024",
    review_date: "1 April, 2024",
    sellerReply:
      "Thank you for your detailed review! We're glad you're satisfied with the product.",
    reply_date: "2 April, 2024",
  },
  {
    id: 2,
    image: "/reviewImage.png",
    name: "Product Name",
    brand: "Brand",
    size: "Size",
    color: "Color",
    rating: 5,
    description:
      "“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt antium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim”",
    thumbnail_1: "/thumbnail1.png",
    thumbnail_2: "/thumbnail2.png",
    thumbnail_3: "/thumbnail3.png",
    purchase_date: "15 May, 2024",
    review_date: "1 April, 2024",
  },
  {
    id: 3,
    image: "/reviewImage.png",
    name: "Product Name",
    brand: "Brand",
    size: "Size",
    color: "Color",
    rating: 5,
    description:
      "“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt antium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim”",
    thumbnail_1: "/thumbnail1.png",
    thumbnail_2: "/thumbnail2.png",
    thumbnail_3: "/thumbnail3.png",
    purchase_date: "15 May, 2024",
    review_date: "1 April, 2024",
  },
];

export const ToPayProductList: TOrder[] = [
  {
    id: 1,
    store_name: "Store Name",
    image: "/order.png",
    name: "Product Name",
    brand: "Brand",
    size: "Size",
    color: "Color",
    quantity: "01",
    status: "In-Progress",
    price: "$499.99",
  },
  {
    id: 2,
    store_name: "Store Name",
    image: "/order.png",
    name: "Product Name",
    brand: "Brand",
    size: "Size",
    color: "Color",
    quantity: "01",
    status: "In-Progress",
    price: "$499.99",
  },
];

export const TProductReview: {
  store_name: string;
  status: string;
  products: {
    id: number;
    image: string;
    name: string;
    brand: string;
    size: string;
    color: string;
    quantity: string;
    status: string;
    price: string;
    stock: string;
  }[];
}[] = [
  {
    store_name: "Store Name",
    status: "Completed",
    products: [
      {
        id: 1,
        image: "/order.png",
        name: "Product Name",
        brand: "Brand",
        size: "Size",
        color: "Color",
        quantity: "01",
        status: "In-Progress",
        price: "$499.99",
        stock: "In-stock",
      },
      {
        id: 2,
        image: "/order.png",
        name: "Product Name",
        brand: "Brand",
        size: "Size",
        color: "Color",
        quantity: "01",
        status: "In-Progress",
        price: "$499.99",
        stock: "In-stock",
      },
      {
        id: 3,
        image: "/order.png",
        name: "Product Name",
        brand: "Brand",
        size: "Size",
        color: "Color",
        quantity: "01",
        status: "In-Progress",
        price: "$499.99",
        stock: "In-stock",
      },
    ],
  },
  {
    store_name: "Store Name",
    status: "Completed",
    products: [
      {
        id: 4,
        image: "/order.png",
        name: "Product Name",
        brand: "Brand",
        size: "Size",
        color: "Color",
        quantity: "01",
        status: "In-Progress",
        price: "$499.99",
        stock: "In-stock",
      },
      {
        id: 5,
        image: "/order.png",
        name: "Product Name",
        brand: "Brand",
        size: "Size",
        color: "Color",
        quantity: "01",
        status: "In-Progress",
        price: "$499.99",
        stock: "In-stock",
      },
      {
        id: 6,
        image: "/order.png",
        name: "Product Name",
        brand: "Brand",
        size: "Size",
        color: "Color",
        quantity: "01",
        status: "In-Progress",
        price: "$499.99",
        stock: "In-stock",
      },
    ],
  },
];
