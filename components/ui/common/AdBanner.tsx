import React from "react";
import styled from "styled-components";

type TAdBannerProps = {
  src: string;
  alt: string;
  link?: string;
  width?: string;
  height?: string;
  type?: "banner" | "2*2" | "2*4" | "3*3" | "3*4";
  sizes?: string;
  className?: string;
  onClick?: () => void;
};

const BannerImage = styled.img<TAdBannerProps>`
  width: ${(props) => {
    switch (props.type) {
      case "banner":
        return "100%";
      case "2*2":
        return "13rem";
      case "2*4":
        return "27.81rem";
      case "3*3":
        return "37.5rem";
      case "3*4":
        return "50rem";
      default:
        return props?.width;
    }
  }};

  height: ${(props) => {
    switch (props.type) {
      case "banner":
        return "auto";
      case "2*2":
        return "auto";
      case "2*4":
        return "12.5rem";
      case "3*3":
        return "18.75rem";
      case "3*4":
        return "12.5rem";
      default:
        return "100%";
    }
  }};

  @media (max-width: 768px) {
    width: ${(props) => {
      switch (props.type) {
        case "banner":
          return "100%";
        case "2*2":
          return "10rem";
        case "2*4":
          return "18rem";
        case "3*3":
          return "24rem";
        case "3*4":
          return "32rem";
        default:
          return "auto";
      }
    }};
    height: auto;
  }

  @media (max-width: 480px) {
    width: 100%; // Make it full width for small devices
    height: auto; // Maintain aspect ratio
  }
`;

const AdBanner: React.FC<TAdBannerProps> = ({
  src,
  alt,
  link,
  width,
  height,
  className = "",
  type,
  onClick,
}) => {
  const content = (
    <BannerImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      type={type}
      className={className}
      onClick={onClick}
      style={{ cursor: link ? "pointer" : "default", objectFit: "cover" }}
    />
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};

export default AdBanner;
