"use client";

import React from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import styled from "styled-components";

type ProductInfoBlockProps = {
  productImage: string;
  productName: string;
  rating: number;
  color?: string;
  size?: string;
  weight?: string;
};

const ProductInfoBlock = ({
  productImage,
  productName,
  rating,
  color,
  size,
  weight,
}: ProductInfoBlockProps) => {
  return (
    <div className="d-flex gap-3">
      <ProductImage
        src={productImage || "/placeholder.png"}
        width={82}
        height={82}
        alt="Product Image"
      />
      <div>
        <ProductName className="fw-semibold">{productName}</ProductName>
        <div className="d-flex flex-row gap-1 productAttribute">
          {color && (
            <div>
              <span>Color:</span>
              {color},
            </div>
          )}
          {size && (
            <div>
              <span>Size:</span>
              {size},
            </div>
          )}
          {weight && (
            <div>
              <span>Weight:</span>
              {weight}
            </div>
          )}
        </div>
        <div>
          <Rating initialValue={rating} size={24} readonly />
        </div>
      </div>
    </div>
  );
};

export default ProductInfoBlock;

const ProductName = styled.div`
  font-size: 1.125rem;
`;
const ProductImage = styled(Image)`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;
