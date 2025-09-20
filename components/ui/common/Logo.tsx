"use client";
import Image from "next/image";
import styled from "styled-components";

const LogoContainer = styled.div<{ justifyitem?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justifyitem || "center"};
  flex-shrink: 1;

  /* Ensures responsiveness */
  max-width: 100%;
`;

const StyledImage = styled(Image)`
  max-width: 100%;
  height: auto;

  // Mobile styles
  @media (max-width: 768px) {
    width: 62px !important;
    height: 62px !important;
  }
`;

const Logo = ({
  src,
  width = 120,
  height = 62,
  justifyitem = "center",
}: {
  src: string;
  width?: number;
  height?: number;
  justifyitem?: string;
}) => {
  return (
    <LogoContainer justifyitem={justifyitem}>
      <StyledImage
        src={src}
        width={width}
        height={height}
        alt="Logo"
        style={{ width: "100%", maxWidth: 150, maxHeight: 150 }} // Ensures responsiveness
      />
    </LogoContainer>
  );
};

export default Logo;
