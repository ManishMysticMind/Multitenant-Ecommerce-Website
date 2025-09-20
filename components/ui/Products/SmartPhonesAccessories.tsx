import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
import SectionTitle from "../common/SectionTitle";
import StyledLink from "../StyledLInk";
const ImageAd = styled.div`
  .SmartphoneAd {
    @media (max-width: 1200px) {
      width: 100%;
    }
  }
`;
const SmartPhonesAccessories = () => {
  // const { data: productData } = useGetBestSellingProduct();
  return (
    <Container className="p-4 p-sm-0">
      <Row className="d-flex flex-wrap justify-content-between g-3">
        <div className="d-flex justify-content-between">
          <SectionTitle
            label="Top Sales & Categories"
            size="md"
            className="pt-0"
          />
          <StyledLink
            href="/products?colloection=32"
            className="text-decoration-none text-primary"
            text="View all"
          />
        </div>
        <Row md={3} xs={2} lg={5} className="d-flex flex-wrap mt-0">
          {/* {productData?.slice(0, 8).map((item: TProductDetail) => (
            <Col xs={6} sm={4} md={3} lg={3} key={item?.id} className="p-0">
              <ProductCard data={item} />
            </Col>
          ))} */}
        </Row>
      </Row>
    </Container>
  );
};

export default SmartPhonesAccessories;
