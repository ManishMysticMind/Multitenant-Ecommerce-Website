import React from "react";
import { DiscountProductDetail } from "../../../lib/types";
import styled from "styled-components";
import Image from "next/image";

const DiscountWrapper = styled.div<Partial<DiscountProductDetail>>`
  width: auto;
  position: relative;
  padding-top: 5rem;
  padding-bottom: 1rem;
  margin-top: 3rem;
  background-color: #fbf9f9;
  border-radius: 8px;
  flex-grow: ${(props) => {
    switch (props.size) {
      case "sm":
        return "1";
      case "md":
        return "2";
      case "lg":
        return "3";
      default:
        return "1";
    }
  }};
`;
const DiscountProductImage = styled.div`
  position: absolute;
  top: -5rem;
  width: 95%;
  text-align: center;
  .discountImage {
    width: auto;
  }
`;
const DiscountAmount = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
`;
const DiscountProductTitle = styled.div`
  text-align: center;
`;

const DiscountProductCard: React.FC<{ data: DiscountProductDetail }> = ({
  data,
}) => {
  const { id, title, image, description, size } = data;
  return (
    <>
      <DiscountWrapper key={id} size={size}>
        <DiscountProductImage>
          <Image
            src={image}
            width={100}
            height={150}
            alt="Discount Product"
            className="discountImage"
          />
        </DiscountProductImage>
        <DiscountAmount>{description}</DiscountAmount>
        <DiscountProductTitle>{title}</DiscountProductTitle>
      </DiscountWrapper>
    </>
  );
};

export default DiscountProductCard;
