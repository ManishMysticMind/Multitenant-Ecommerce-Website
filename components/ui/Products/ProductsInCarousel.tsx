import { useState } from "react";
import "swiper/css";
import "swiper/css/grid"; // Important for grid layout
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { Container } from "react-bootstrap";
import { Grid, Pagination } from "swiper/modules";
import { useGetCollectionDetail } from "../../../hooks/api/collections";
import { TProductDetail } from "../../../lib/types";
import StyledLink from "../StyledLInk";
import { SwiperNextButton } from "../SwiperButtons/nextButton";
import { SwiperPrevButton } from "../SwiperButtons/prevButton";
import SectionTitle from "../common/SectionTitle";
import ProductCard from "./ProductCard";
import { TComponent } from "./Products";
import { useGetProducts } from "../../../hooks/api/products/DynamicProduct";

const SwiperProducts = ({ specifications }: TComponent) => {
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const { data: productData } = useGetProducts(
    specifications?.id,
    specifications?.model
  );
  const numberOfRow = specifications?.rows;

  console.log("id, specifications", specifications);

  return (
    <Container className="mb-5 px-2 px-md-0 gx-0 ">
      <div className="d-flex justify-content-between align-items-center">
        <SectionTitle label={productData?.name} size="md" />
        <StyledLink
          href={`/products/?collection=${productData?.slug}`}
          className="text-decoration-none text-primary"
          text="View all"
        />
      </div>
      <div className="d-flex align-items-center">
        <div onClick={() => swiperRef?.slidePrev()}>
          <SwiperPrevButton />
        </div>
        <Swiper
          modules={[Pagination, Grid]}
          pagination={false} //  Remove pagination for better behavior with grids
          spaceBetween={10}
          onSwiper={(swiper) => setSwiperRef(swiper)}
          breakpoints={{
            0: {
              slidesPerView: 2, // 2 columns for smaller screens
              grid: { rows: 2, fill: "column" }, // Fill column-wise
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 3, // 3 columns
              grid: { rows: 3, fill: "column" }, //  Fill column-wise for better layout
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4, // 3 columns
              grid: { rows: 3, fill: "column" }, //  Fill column-wise
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 5,
              grid: { rows: numberOfRow, fill: "row" }, //  Fill row-wise
              spaceBetween: 10,
            },
          }}
        >
          {productData?.products?.map((item: TProductDetail) => (
            <SwiperSlide key={item?.id}>
              <ProductCard data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div onClick={() => swiperRef?.slideNext()}>
          <SwiperNextButton />
        </div>
      </div>
    </Container>
  );
};

export default SwiperProducts;
