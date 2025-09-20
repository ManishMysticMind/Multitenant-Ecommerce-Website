import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import SectionTitle from "../common/SectionTitle";

const categoriesData = [
  {
    id: 1,
    title: "Mobiles & Accessories",
    discount: "Upto 70% Off",
    imageUrl: "/images/categories/mobile2-placeholder.jpg",
    altText: "Placeholder image for Mobiles & Accessories category",
  },
  {
    id: 2,
    title: "Shoes",
    discount: "Upto 70% Off",
    imageUrl: "/images/categories/shoes-placeholder.jpg",
    altText: "Placeholder image for Shoes category",
  },
  {
    id: 3,
    title: "TV & Audio",
    discount: "Upto 70% Off",
    imageUrl: "/images/categories/tv2-placeholder.jpg",
    altText: "Placeholder image for TV & Audio category",
  },
  {
    id: 4,
    title: "Camera",
    discount: "Upto 70% Off",
    imageUrl: "/images/categories/camera2-placeholder.jpg",
    altText: "Placeholder image for Camera category",
  },
];

const StyledCard = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075); /* shadow-sm equivalent */
  color: white; /* text-white equivalent */
  font-family: Jost, sans-serif;
  font-weight: 500;
`;

const StyledCardImage = styled.img`
  display: block;
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const StyledCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.4);
`;

const StyledCardTitle = styled.h5`
  margin-bottom: 0.25rem; /* mb-1 equivalent */
  font-weight: 700; /* fw-bold equivalent */
`;

const StyledCardText = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
`;

const CategoryType3 = () => {
  const category1 = categoriesData[0];
  const category2 = categoriesData[1];
  const category3 = categoriesData[2];
  const category4 = categoriesData[3];

  return (
    <Container className="mb-4">
      <SectionTitle label={"Categories V3"} size="md" />
      <Row className="">
        <Col key={category1.id} md={5} sm={12} xs={12} className="d-flex p-1">
          <StyledCard>
            <StyledCardImage src={category1.imageUrl} alt={category1.altText} />
            <StyledCardOverlay>
              <StyledCardTitle>{category1.title}</StyledCardTitle>
              <StyledCardText>{category1.discount}</StyledCardText>
            </StyledCardOverlay>
          </StyledCard>
        </Col>
        <Col key={category2.id} md={7} sm={12} xs={12} className="d-flex p-1">
          <StyledCard>
            <StyledCardImage src={category2.imageUrl} alt={category2.altText} />
            <StyledCardOverlay>
              <StyledCardTitle>{category2.title}</StyledCardTitle>
              <StyledCardText>{category2.discount}</StyledCardText>
            </StyledCardOverlay>
          </StyledCard>
        </Col>
        <Col key={category3.id} md={8} sm={12} xs={12} className="d-flex p-1">
          <StyledCard>
            <StyledCardImage src={category3.imageUrl} alt={category3.altText} />
            <StyledCardOverlay>
              <StyledCardTitle>{category3.title}</StyledCardTitle>
              <StyledCardText>{category3.discount}</StyledCardText>
            </StyledCardOverlay>
          </StyledCard>
        </Col>
        <Col key={category4.id} md={4} sm={12} xs={12} className="d-flex p-1">
          <StyledCard>
            <StyledCardImage src={category4.imageUrl} alt={category4.altText} />
            <StyledCardOverlay>
              <StyledCardTitle>{category4.title}</StyledCardTitle>
              <StyledCardText>{category4.discount}</StyledCardText>
            </StyledCardOverlay>
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryType3;
