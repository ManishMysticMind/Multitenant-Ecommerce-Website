import React from "react";
import styled from "styled-components";
import { TextShimmer } from "../Shimmer/shimmerStyles";
import { ShimmerPrice } from "../Shimmer/common/ProductCardShimmer";

export interface TitleProps {
  label: string | number;
  size?: "sm" | "md" | "lg" | string;
  className?: string;
  textalign?: string;
  width?: string;
}

const TitleStyle = styled("div").withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["size", "textalign", "theme"].includes(prop),
})<Partial<TitleProps>>`
  font-size: ${(props) => {
    switch (props.size) {
      case "sm":
        return "1.163rem";
      case "md":
        return "1.575rem";
      case "lg":
        return "1.88rem";
      default:
        return props?.size;
    }
  }};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  text-align: ${(props) => props?.textalign};
  padding: 2rem 0rem;

  @media (min-width: 768px) {
    font-size: ${(props) => {
      switch (props.size) {
        case "sm":
          return "1.163rem";
        case "md":
          return "1.675rem";
        case "lg":
          return "1.98rem";
        default:
          return props?.size;
      }
    }};
  }

  @media (min-width: 1024px) {
    font-size: ${(props) => {
      switch (props.size) {
        case "sm":
          return "1.563rem";
        case "md":
          return "2rem";
        case "lg":
          return "3rem";
        default:
          return props?.size;
      }
    }};
  }
`;

const SectionTitle: React.FC<TitleProps> = ({
  size,
  label,
  className,
  textalign = "start",
  width,
}) => {
  return (
    <>
      {label ? (
        <TitleStyle size={size} textalign={textalign} className={className}>
          {label}
        </TitleStyle>
      ) : (
        <ShimmerPrice width={width} />
      )}
    </>
  );
};

export default SectionTitle;
