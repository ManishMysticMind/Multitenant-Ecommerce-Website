"use client";
import { lazy, useEffect } from "react";

import Products from "../components/ui/Products/Products";
import ProductsInCarousel from "../components/ui/Products/ProductsInCarousel";
import { useGuestLogin } from "../hooks/api/auth/guestLogin";
import { useFilterWebSiteInfo } from "../hooks/api/websetting";
import { useAuth } from "../hooks/auth/useAuth";
import AdBanner from "../components/ui/common/AdBanner";
import Advertisement from "../components/ui/Advertisement";
import ProductListingShimmer from "../components/ui/Shimmer/ProductListingShimmer";
import HomepageLayoutShimmer from "../components/ui/Shimmer/HomepageLayoutShimmer";
import HeroSection1 from "../components/ui/HeroSection/HeroSection1";
import HeroSection2 from "../components/ui/HeroSection/HeroSection2";
import HeroSection3 from "../components/ui/HeroSection/HeroSection3";
import CategoryType1 from "../components/ui/categories/CategoryType1";
import CategoryType2 from "../components/ui/categories/CategoryType2";
import CategoryType3 from "../components/ui/categories/CategoryType3";

const DiscountProduct = lazy(
  () => import("../components/ui/DiscountSection/DiscountProduct")
);
const ProductCategory = lazy(
  () => import("../components/ui/ProductCategory/ProductCategory")
);
const SmartPhonesAccessories = lazy(
  () => import("../components/ui/Products/SmartPhonesAccessories")
);
const Recommendations = lazy(
  () => import("../components/ui/Recommendations/Recommendations")
);
const BestSellers = lazy(() => import("../components/ui/Products/BestSellers"));
const OfferSection = lazy(
  () => import("../components/ui/OfferSection/OfferSection")
);
const AdGrid = lazy(() => import("../components/ui/AdGrid"));

// const components = [
//   { component: <HeroSection />, position: 1 },
//   // {
//   //   component: <Features />,
//   //   position: 2,
//   // },
//   // { component: <Products title="Featured products" />, position: 2 },
//   {
//     component: (
//       <Container className="my-3 my-sm-5 px-0">
//         <AdBanner
//           src="/images/ads/advertisement.png"
//           alt="ad"
//           className="object-fit-contain"
//           type="banner"
//         />
//       </Container>
//     ),
//     position: 2,
//   },
//   // { component: <AdGrid />, position: 4 },
//   { component: <SmartPhonesAccessories />, position: 3 },
//   {
//     component: (
//       <Container className="my-3 my-sm-5 px-0">
//         <AdBanner
//           src="/images/ads/1.png"
//           alt="ad"
//           className="object-fit-contain"
//           type="banner"
//         />
//       </Container>
//     ),
//     position: 4,
//   },
//   // { component: <OfferSection />, position: 4 },
//   { component: <LatestDeals />, position: 5 },
//   // { component: <ProductCategory />, position: 6 },
//   // { component: <BestSellers />, position: 9 },
//   // {
//   //   component: (
//   //     <Container className="my-3 my-sm-5 px-0">
//   //       <AdBanner
//   //         src="/images/ads/banner2.png"
//   //         alt="ad"
//   //         className="object-fit-cover"
//   //         type="banner"
//   //       />
//   //     </Container>
//   //   ),
//   //   position: 10,
//   // },
//   // { component: <DiscountProduct />, position: 8 },

//   // { component: <Recommendations />, position: 11 },
// ];

export default function Page() {
  const { role } = useAuth();
  const { mutate: guestLoginCredentials } = useGuestLogin();

  const { data } = useFilterWebSiteInfo();

  console.log("data", data);

  useEffect(() => {
    guestLoginCredentials();
  }, []);

  const renderComponents = (content: any) => {
    const isHeroSection = content?.component_type === "HERO_SECTION";
    const isCarousel =
      content?.component_type === "PRODUCT_LIST" &&
      content?.specifications?.horizontal_scroll === "true";
    const isAdvertisement = content?.component_type === "ADVERTISEMENT";
    const isProductList = content?.component_type === "PRODUCT_LIST";
    const isCategoryList = content?.component_type === "CATEGORY_LIST";

    if (isHeroSection) {
      if (content.component === "HERO_SECTION_1") {
        return <HeroSection1 />;
      } else if (content.component === "HERO_SECTION_2") {
        return <HeroSection2 />;
      } else if (content.component === "HERO_SECTION_3") {
        return <HeroSection3 />;
      }
    }
    if (isCategoryList) {
      if (content.component === "CATEGORY_TYPE_1") {
        return <CategoryType1 />;
      } else if (content.component === "CATEGORY_TYPE_2") {
        return <CategoryType2 />;
      } else if (content.component === "CATEGORY_TYPE_3") {
        return <CategoryType3 />;
      }
    }
    if (isProductList && !isCarousel) return <Products {...content} />;
    if (isProductList && isCarousel) return <ProductsInCarousel {...content} />;
    if (isAdvertisement && content?.specifications?.id)
      return <Advertisement id={content?.specifications?.id} />;
    return null;
  };

  if (!data?.homepage_content) return <HomepageLayoutShimmer />;

  return (
    <>
      {Array.isArray(data?.homepage_content) &&
        [...data.homepage_content]
          .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
          .map((content: any, index: any) => (
            <div key={index}>{renderComponents(content)}</div>
          ))}
      {/* <CategoryType3 /> */}
      {/* <CategoryV3Dynamic /> */}
    </>
  );
}