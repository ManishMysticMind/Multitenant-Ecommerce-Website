import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Parallax, Pagination, Autoplay } from "swiper/modules";
import styled from "styled-components";
import { useGetSlidersList } from "../../../hooks/api/slider/getHeroSlider";
import SliderShimmer from "../Shimmer/SliderShimmer";

const SliderMainDiv = styled.div<any>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-image: url(${(props) => props.image_url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 1rem;
  border-radius: 8px;
  @media (max-width: 1000px) {
    padding: 1.5rem;
  }
  min-height: 400px;
  @media (max-width: 600px) {
    min-height: 300px;
  }
`;

export default function HeroSlider() {
  const { data: sliders, isLoading, error } = useGetSlidersList();

  if (isLoading) return <SliderShimmer />;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Swiper
        speed={600}
        parallax={true}
        pagination={{ clickable: true }}
        modules={[Parallax, Pagination, Autoplay]}
        className="heroSlider"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 1, spaceBetween: 20 }, // 2 slides on tablets
          1024: { slidesPerView: 1, spaceBetween: 30 }, // 3 slides on desktops
        }}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
      >
        {sliders?.map((slide: any) => (
          <SwiperSlide key={slide.id}>
            <SliderMainDiv
              image_url={slide.bg_image}
              onClick={() => {
                if (slide.link && slide.link !== "") {
                  window.open(slide.link, "_blank");
                }
              }}
              style={{ cursor: slide.link ? "pointer" : "default" }}
            >
              <div className="text" data-swiper-parallax="-100">
                <div
                  dangerouslySetInnerHTML={{ __html: slide.slider_content }}
                ></div>
              </div>
            </SliderMainDiv>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
