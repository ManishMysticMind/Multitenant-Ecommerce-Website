import React from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import { TCategory } from "../../../lib/types";

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  height: 100%;
  border-radius: 5px;
  .categoryImage {
    object-fit: cover;
    @media (max-width: 1200px) {
      width: 100%;
    }
  }
`;
const CategoryName = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
  padding: 1rem;
  text-align: center;
`;
const ProductCategoryItem: React.FC<{ data: TCategory }> = ({ data }) => {
  const { name, image_url } = data;
  return (
    <>
      <CategoryWrapper>
        <Col>
          <img
            src={image_url}
            width={200}
            height={150}
            alt="Category"
            className="categoryImage"
          />
        </Col>
        <Col>
          <CategoryName>{name}</CategoryName>
        </Col>
      </CategoryWrapper>
    </>
  );
};

export default ProductCategoryItem;
