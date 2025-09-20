import { Col, Container, Row } from "react-bootstrap";
import AdBanner from "../common/AdBanner";
import SectionTitle from "../common/SectionTitle";

const BestSellers = () => {
  // const { data: productData ,isLoading } = useGetBestSellingProduct();
  // if(isLoading) return <ProductListingShimmer/>;

  return (
    <Container className="p-4 p-sm-0">
      <Row className="d-flex  flex-wrap">
        <Col sm={12} md={2} lg={3} className="d-none d-lg-block">
          <AdBanner
            src="/images/ads/5.png"
            alt="ad"
            type="2*2"
            className="object-fit-cover"
          />
        </Col>
        <Col className="g-3">
          <Row className="d-flex flex-wrap mt-0">
            <SectionTitle label="Best Sellers" size="sm" className="pt-0" />
            {/* {productData?.slice(0, 8).map((item: TProductDetail) => (
              <Col xs={6} sm={4} md={3} lg={3} key={item?.id} className="p-0">
                <ProductCard data={item} />
              </Col>
            ))} */}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default BestSellers;
