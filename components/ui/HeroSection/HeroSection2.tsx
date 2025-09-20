import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Suspense } from "react";
import { useGetSlidersList } from "../../../hooks/api/slider/getHeroSlider";
import SliderShimmer from "../Shimmer/SliderShimmer";

export default function HeroV2() {
  const { data: slides, isLoading, error } = useGetSlidersList();

  if (isLoading) return <SliderShimmer />;
  if (error) return <p>Something went wrong!</p>;

  const swiperParams = {
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
  };

  return (
    <HeroSection>
      <Swiper {...swiperParams} modules={[Autoplay, Pagination]}>
        <Suspense fallback={<div>Loading slides...</div>}>
          {slides?.map((slide:any) => (
            <SwiperSlide key={slide.id}>
              {/* Conditionally wrap with <a> if pointer exists */}
              {slide.link &&
              typeof slide.link === "string" &&
              slide.link.length > 0 ? (
                <a
                  href={slide.link}
                  target="_blank"
                  style={{
                    display: "block",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  <StyledSlideContent
                    $backgroundImage={slide?.bg_image}
                    dangerouslySetInnerHTML={{ __html: slide?.slider_content }}
                  ></StyledSlideContent>
                </a>
              ) : (
                <StyledSlideContent
                  $backgroundImage={slide?.bg_image}
                  dangerouslySetInnerHTML={{ __html: slide?.slider_content }}
                ></StyledSlideContent>
              )}
            </SwiperSlide>
          ))}
        </Suspense>
      </Swiper>
    </HeroSection>
  );
}

// Removed const SwiperPaginationStyles = createGlobalStyle`...`;

const StyledSlideContent = styled.div<{ $backgroundImage: string }>`
  height: 16rem;
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: normal;
  color: white; /* Text color for contrast */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Add shadow for readability */
  padding: 20px;
  /* Removed cursor: pointer here, added to <a> tag */
`;

const HeroSection = styled(Container)`
  padding: 0;
  position: relative; /* Needed for absolute positioning of pagination */

  .swiper-pagination {
    position: absolute;
    bottom: 20px !important;
    left: 0;
    width: 100% !important;
    text-align: center;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-pagination-bullet {
    width: 8px; /* Default width */
    height: 8px; /* Default height */
    display: inline-block;
    border-radius: 50%; /* Make them round */
    background: #fff; /* Default color */
    opacity: 0.8; /* Default opacity */
    margin: 0 4px; /* Spacing between bullets */
    transition:
      width 0.3s ease,
      background-color 0.3s ease; /* Smooth transition */
    cursor: pointer;
  }

  .swiper-pagination-bullet-active {
    width: 30px; /* Wider active bullet */
    border-radius: 4px; /* Make active bullet rectangular/rounded rectangle */
    background: #007bdd;
    opacity: 1;
  }

  /* Add cursor pointer for the whole slide content when it's a link */
  .swiper-slide a {
    display: block; /* Ensure the link covers the slide content */
  }
`;
