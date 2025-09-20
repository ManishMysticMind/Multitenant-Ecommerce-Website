import { css, keyframes, styled } from "styled-components";

// Define shimmer animation
export const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Reusable shimmer effect styles
export const shimmerEffect = css`
  background: linear-gradient(to right, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%);
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 1.5s infinite linear;
  border-radius: 5px;
`;

export const TextShimmer = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => props.width || "60%"};
  height: ${(props) => props.height || "20px"};
  margin: 10px 0;
  border-radius: 5px;
  background-color: #e0e0e0;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

export const ImageShimmer = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => props.width || "80%"};
  height: ${(props) => props.height || "200px"};
  margin: ${(props) => (props.width || props.height ? "0" : "20px 0")};
  border-radius: 10px;
  background-color: #e0e0e0;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

export const ShimmerButton = styled.div`
  width: 30%;
  height: 40px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #e0e0e0;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;
