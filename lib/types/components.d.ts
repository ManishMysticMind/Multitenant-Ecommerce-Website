export type BuyerResource = {
    id: number;
    title: string;
    redirect: string;
  };
  
  export type InformationList = {
    id: number;
    title: string;
    redirect: string;
  };
  
  export type ContactList = {
    id: number;
    title: string;
    redirect: string;
    icon: React.ReactNode;
    border?: "true" | "false";
  };


  export type TFeatureDetail = {
    id: number;
    icon: React.ReactNode;
    title: string;
    description: string;
  };

export type DiscountProductDetail = {
  id: number;
  image: string;
  description: string;
  title: string;
  size?: "sm" | "md" | "lg";
};

export type TCategory = {
    id:                 number;
    name:               string;
    description:        string;
    position:           null;
    image:              string;
    image_url:          string;
    company:            number;
    enable_on_homepage: boolean;
    enable_on_menu:     boolean;
    visible:            boolean;
    discount:           any[];
    created_at:         Date;
    updated_at:         Date;
    meta_keyword:       string;
    meta_description:   string;
    meta_title:         string;
    seo_name:           string;
    slug:               string;
}

export type TCountDown = {
  id: number;
  time: number;
  hour: string;
};

export type TSwiperImage = {
  id: number;
  src: string;
};