import React from "react";
import { TProductDetail } from "../../../lib/types";
import Image from "next/image";
import { styled } from "styled-components";

const RecommendedWraper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;
const RecommendedItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;
const RecommendedItemTitle = styled.div`
  font-weight: 500;
`;
const RecommendedItemPrice = styled.div`
  color: #006fdc;
  font-weight: 600;
`;
const RecommendedItemImage = styled.div`
  border: 1px solid #f2f2f2;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.6rem;
  .recommendImage {
    object-fit: cover;
  }
`;
const RecommendedItem: React.FC<{ data: TProductDetail }> = ({ data }) => {
  const { id, name, photos, price } = data;
  return (
    <>
      <RecommendedWraper key={id}>
        <RecommendedItemImage>
          <Image
            src={photos[0].image_url}
            width={100}
            height={100}
            alt="product"
            className="recommendImage"
          />
        </RecommendedItemImage>
        <RecommendedItemDetail>
          <RecommendedItemTitle className="text-limit-two-line">
            {name}
          </RecommendedItemTitle>
          <RecommendedItemPrice>{price}</RecommendedItemPrice>
        </RecommendedItemDetail>
      </RecommendedWraper>
    </>
  );
};

export default RecommendedItem;
