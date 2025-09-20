import React from "react";
import styled from "styled-components";
import { shimmerEffect } from "../shimmerStyles";

const ShimmerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  // width: 250px;
  // height: 300px;
  background: #f4f4f4;
`;

const ShimmerBadge = styled.div`
  width: 40px;
  height: 20px;
  ${shimmerEffect}; // Apply reusable shimmer styles
`;

const ShimmerImage = styled.div`
  width: 100%;
  height: 120px;
  ${shimmerEffect};
`;

export const ShimmerText = styled.div<{ width?: string }>`
  width: ${(props) => props.width || "100%"};
  height: 15px;
  ${shimmerEffect};
`;

export const ShimmerPrice = styled.div<{ width?: string ,height?:string}>`
  width: ${(props) => props.width || "50%"};
  height: 20px;
  ${shimmerEffect};
`;

const ProductCardShimmer = () => {
  return (
    <ShimmerWrapper>
      <ShimmerBadge />
      <ShimmerImage />
      <ShimmerText width="80%" />
      <ShimmerPrice />
      <ShimmerText width="40%" />
    </ShimmerWrapper>
  );
};

export default ProductCardShimmer;
