import React from 'react'
import { styled,css,keyframes } from 'styled-components';

// Keyframes for Animation
const keyframesFullView = keyframes`
  100% {
    width: 100%;
  }
`;

const keyframesShimmer = keyframes`
  0% {
    background-position: -80vw 0;
  }
  100% {
    background-position: 80vw 0;
  }
`;

// Shimmer Animation
export const shimmerAnimation = css`
  background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  background-color: #eff1f3; /* Fallback */
  background-size: 80vw 100%;
  animation: ${keyframesShimmer} 2s infinite linear;
`;

// Single Comment Line
const Comment = styled.div<{ w80?: boolean }>`
  height: 10px;
  background: #777;
  margin-top: 6px;
  margin-bottom: 6px;
  border-radius: 8px;
  width: ${({ w80 }) => (w80 ? '80%' : '100%')};
  ${shimmerAnimation}
`;
const CommentShimmer = ({width}:any) => {
  return (
    <>
          <Comment w80={width} />
    </>
  )
}

export default CommentShimmer