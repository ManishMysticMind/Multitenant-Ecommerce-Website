import React from 'react';
import styled, { keyframes, css } from 'styled-components';

// Wrapper Section
const Section = styled.div`
  padding: 12px;
`;

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
const shimmerAnimation = css`
  background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  background-color: #eff1f3; /* Fallback */
  background-size: 80vw 100%;
  animation: ${keyframesShimmer} 2s infinite linear;
`;

// Comment Wrapper
const CommentShimmerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  height: 40px;
  width: 0px;
  margin-bottom: 10px;
  color: #eff1f3;
  animation: ${keyframesFullView} 0.5s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

// Avatar
const CommentAvatar = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
  ${shimmerAnimation}
`;

// Comment Area
const CommentArea = styled.div`
  display: block;
  width: 100%;
`;

// Single Comment Line
const Comment = styled.div<{ width?: string }>`
  height: 10px;
  background: #777;
  margin-top: 6px;
  margin-bottom: 6px;
  border-radius: 8px;
  width: ${({ width }) => (width ? width : '100%')};
  ${shimmerAnimation}
`;

// Shimmer Component
export const ListingShimmer = () => {
  return (
    <Section>
      {[...Array(3)].map((_, index) => (
        <CommentShimmerWrapper key={index}>
          {/* <CommentAvatar /> */}
          <CommentArea>
            <Comment width={'80%'} />
            {/* <Comment /> */}
          </CommentArea>
        </CommentShimmerWrapper>
      ))}
    </Section>
  );
};
