import React from "react";
import { Row } from "react-bootstrap";
import { styled } from "styled-components";
import SectionTitle from "../common/SectionTitle";
import Link from "next/link";
import { LuDot } from "react-icons/lu";
const BannerWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundDark};
  display: flex;
  justify-content: center;
  min-height: 20rem;
  .productTitle {
    color: #ffffff;
    padding: 0rem;
    display: flex;
    justify-content: center;
    align-items: end;
  }
`;
const Breadcrumb = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  .breadcrumbNav.active {
    color: ${(props) => props.theme.colors.primary};
  }
  .breadcrumbNav {
    color: white;
    text-decoration: none;
    font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  }
`;

const DetailPageBanner = () => {
  return (
    <BannerWrapper>
      <Row>
        <SectionTitle
          label="Product Details Page"
          size="lg"
          className="productTitle pt-0 text-center"
        />
        <Breadcrumb>
          <Link href="/" className="breadcrumbNav active">
            Home
            <LuDot className="ms-3" />
          </Link>
          <Link href="/" className="breadcrumbNav">
            Shop
            <LuDot className="ms-3" />
          </Link>
          <Link href="/" className="breadcrumbNav">
            Shop List
          </Link>
        </Breadcrumb>
      </Row>
    </BannerWrapper>
  );
};

export default DetailPageBanner;
