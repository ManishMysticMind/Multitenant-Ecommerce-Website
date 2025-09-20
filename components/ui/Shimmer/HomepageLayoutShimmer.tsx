import { Col, Container, Row } from "react-bootstrap";
import { ListingShimmer } from "./List-shimmer";
import ProductListingShimmer from "./ProductListingShimmer";
import SliderShimmer from "./SliderShimmer";

const HomepageLayoutShimmer = () => {
  return (
    <Container className="my-5">
      <Row className="d-flex flex-wrap gx-0 px-0">
        <Col md={3} className="d-none d-md-block">
          <ListingShimmer />
        </Col>
        <Col md={9} className="ps-md-3 ">
          <SliderShimmer />
        </Col>
      </Row>
      <div className="pt-5  pt-md-0 mt-md-0">
        <ProductListingShimmer />
      </div>
    </Container>
  );
};

export default HomepageLayoutShimmer;
