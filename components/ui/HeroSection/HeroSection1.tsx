import React, { Suspense } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import HeroSlider from "./HeroSlider";
import { ListingShimmer } from "../Shimmer/List-shimmer";
import CategoryList from "../CategoryList";

const HeroContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  height: auto;
  padding: 0;
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-height: "400px";
  height: "25rem";
  @media (max-width: 600px) {
    min-height: 300px;
  }
`;

const CategoryListContainer = styled(Col)`
  background-color: #f9f9f9;
`;

const SliderContainer = styled(Col)`
  .swiper-pagination-bullet {
    background: white;
    opacity: unset;
  }
  .swiper-pagination-bullet-active {
    background: ${(props) => props.theme.colors.primary};
  }
`;
const HeroSection1 = () => {
  return (
    <>
      <HeroContainer>
        <Row className="d-flex flex-wrap gx-0 px-0" style={{ height: "25rem" }}>
          <CategoryListContainer
            md={3}
            className="d-none d-md-block"
            style={{ overflowY: "hidden", height: "inherit" }}
          >
            <CategoryList />
          </CategoryListContainer>
          <SliderContainer md={9} className="ps-md-3">
            <Suspense fallback={<ListingShimmer />}>
              <HeroSlider />
            </Suspense>
          </SliderContainer>
        </Row>
      </HeroContainer>
    </>
  );
};

export default HeroSection1;
