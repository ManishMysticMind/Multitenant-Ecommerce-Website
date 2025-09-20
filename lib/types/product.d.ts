export type TStockProgressBarProps = {
  soldStock: number;
  totalStock: number;
  variant?: "primary" | "secondary" | "danger" | "warning";
};

export type TProductDetail = {
  // Basic Information
  id: number;
  name: string;
  description: string;
  short_description: string;

  // Product Attributes
  photos: TPhoto[];
  attribute_mappings: TAttributeMapping[];
  attribute_combination: any[];
  product_tags: any[];

  // Metadata for SEO
  seo_name?: string;
  meta_keyword?: string;
  meta_description?: string;
  meta_title?: string;

  // Pricing & Discount
  old_price?: string;
  price?: string;
  price_with_discount?: string;
  discount_applied?: boolean;
  discount?: any[];
  discount_amount?: string;

  // Rating Details
  avg_rating?: string;
  rating_detail?: { [key: string]: number };

  // Status Flags
  enable_on_homepage?: boolean;
  enable_on_menu?: boolean;
  mark_as_new?: boolean;
  is_published?: boolean;

  // Availability
  available_from?: Date | null;
  available_to?: Date | null;

  // Audit Information
  updated_at?: Date;
  created_at?: Date;

  // Associations
  user?: number;
  company?: number;

  sku?: string;
  categories?: string[];
  tags?: string[];
  currency?: string;

  enable_inventory: boolean;
  stock_qty: number;

  slug: string;
};

export type TPhoto = {
  id: number;
  image: string;
  image_url: string;
  thumbnail: string;
  position: null;
  alt_text: null;
  title: null;
};

export type TOrder = {
  id: number;
  store_name: string;
  image: string;
  name: string;
  brand: string;
  size: string;
  color: string;
  quantity: string;
  status: string;
  price: string;
};
export type TReviewDetail = {
  id: number;
  image: string;
  name: string;
  brand: string;
  size: string;
  color: string;
  rating: number;
  description: string;
  thumbnail_1: string;
  thumbnail_2: string;
  thumbnail_3: string;
  purchase_date: string;
  review_date: string;
  sellerReply?: string;
  reply_date?: string;
};

export type TAttributeMapping = {
  id: number;
  product_attribute: string;
  control_type: string;
  is_required: boolean;
  show_in_catalog: boolean;
  allow_combination: boolean;
  created_at: Date;
  attributes_value: TAttributesValue[];
};

export type TAttributesValue = {
  id: number;
  name: string;
  additional_price: string;
  additional_weight: string;
  is_published: boolean;
  color_rgb: null | string;
  product: number;
  product_attribute: number;
};
