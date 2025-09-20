import React from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { styled } from "styled-components";
import SectionTitle from "../common/SectionTitle";
import { TProductDetail } from "../../../lib/types/product";

const DescriptionWrapper = styled.div`
  margin: 0.5rem 0rem;
  .nav-tabs .nav-link {
    border-bottom: 2px solid #d2d2d2;
    border: none;
    color: #d2d2d2;
    font-weight: 700;
    padding: 0.7rem 0rem;
    margin-right: 4rem;
  }
  .nav-tabs .nav-link:hover {
    border: none;
  }
  .nav-tabs .nav-link.active {
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};
  }
  .productSummary {
    color: #7b7d7f;
    line-height: 35px;
  }
  .productAttribute li::marker {
    color: #e6e6e6;
  }
  .productAttribute li {
    font-weight: 600;
  }
  .productAttribute {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .productAttributeValue li {
    list-style-type: none;
    color: #7b7d7f;
  }
  .productAttributeValue {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;
const ProductDescription = ({ data }: { data: TProductDetail }) => {
  if (!data.description) return null;
  return (
    <>
      <Container>
        <DescriptionWrapper>
          <Tabs
            defaultActiveKey="product"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="product" title="Product Description">
              <Row>
                <Col sm={12} md={8}>
                  {/* <SectionTitle
                    label="Introduction"
                    size="2.5rem"
                    className="py-3"
                  /> */}
                  <p
                    className="productSummary"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></p>
                </Col>
              </Row>
              {/* <Row>
                <Col sm={12} md={4}>
                  <Image
                    src="/product-21.png"
                    alt="Product Image"
                    width={300}
                    height={300}
                  />
                </Col>
                <Col sm={12} md={8} className="d-flex mt-3 mt-sm-0">
                  <Col className="d-flex align-items-center">
                    <ul className="productAttribute">
                      <li>Material:</li>
                      <li>Weight:</li>
                      <li>Color:</li>
                      <li>Sizes:</li>
                    </ul>
                  </Col>
                  <Col className="d-flex align-items-center">
                    <ul className="productAttributeValue">
                      <li>Cotton</li>
                      <li>100g</li>
                      <li>Beige, white, blue</li>
                      <li>44, 48, 50</li>
                    </ul>
                  </Col>
                </Col>
              </Row> */}
            </Tab>
            {/* <Tab eventKey="review" title="Reviews">
              Tab content for Profile
            </Tab>
            <Tab eventKey="tags" title="Tags">
              Tab content for Contact
            </Tab>
            <Tab eventKey="additional" title="Additional Information">
              Tab content for Contact
            </Tab> */}
          </Tabs>
        </DescriptionWrapper>
      </Container>
    </>
  );
};

export default ProductDescription;
