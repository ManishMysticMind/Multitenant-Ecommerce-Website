import React from "react";
import AdBanner from "./common/AdBanner";
import { Container, Row } from "react-bootstrap";

const AdGrid = () => {
  return (
    <Container>
      <Row className="d-flex justify-content-between flex-wrap  my-4 mx-0 px-0 gx-0">
        <AdBanner src="/images/ads/2.jpeg" alt="Grid Ad 1" type="2*2" />
        <AdBanner src="/images/ads/3.jpeg" alt="Grid Ad 2" type="2*2" />
        <AdBanner src="/images/ads/2.jpeg" alt="Grid Ad 3" type="2*2" />
      </Row>
    </Container>
  );
};

export default AdGrid;
