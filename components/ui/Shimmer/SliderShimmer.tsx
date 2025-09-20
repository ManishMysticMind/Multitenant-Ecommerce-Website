import React from "react";
import styled, { keyframes } from "styled-components";
import { ImageShimmer, ShimmerButton, TextShimmer } from "./shimmerStyles";

const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const ShimmerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:rgba(254, 212, 2, 0.54);
  height: 400px;
  position: relative;
  overflow: hidden;
  margin: 0 20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      #e0e0e0 0%,
      #f0f0f0 50%,
      #e0e0e0 100%
    );
    background-size: 200% 100%;
    animation: ${shimmerAnimation} 1.5s infinite linear;
  }
`;

const SliderShimmer = () => {
  return (
    <ShimmerWrapper>
      {/* <TextShimmer width="40%" height="25px" /> */}
      {/* <TextShimmer width="60%" /> */}
      {/* <ImageShimmer /> */}
      {/* <TextShimmer width="80%" height="15px" /> */}
      {/* <ShimmerButton /> */}
    </ShimmerWrapper>
  );
};

export default SliderShimmer;
