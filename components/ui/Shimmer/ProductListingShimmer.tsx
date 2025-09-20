import React from "react";
import ProductCardShimmer from "./common/ProductCardShimmer";
import { Col, Container, Row } from "react-bootstrap";

const ProductListingShimmer = ({ count = 5 }: { count?: number }) => {
  return (
    <>
      <Container className="p-sm-4">
        <Row className="d-flex flex-wrap g-2">
          {[...Array(count)].map((_, index) => (
            <Col key={index} xs={6} md={4} lg={3}>
              <ProductCardShimmer />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductListingShimmer;
