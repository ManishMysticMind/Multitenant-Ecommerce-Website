import React from "react";
import { TProductDetail } from "../../../lib/types";
import { Col, Container, Row } from "react-bootstrap";
import RecommendedItem from "./RecommendedItem";
import SectionTitle from "../common/SectionTitle";
import DividerLine from "../common/Divider";
import { useGetHandPickedProduct } from "../../../hooks/api/products/getHandPickedProducts";

const Recommendations = () => {
  const { data: productData } = useGetHandPickedProduct();
  return (
    <>
      <Container className="py-3 py-sm-5">
        <Row className="px-0 d-flex justify-content-between g-3">
          <Col sm={6}>
            <SectionTitle
              label="Hand Picked for you"
              size="sm"
              className="p-0"
            />
            <DividerLine />
            <Col className="d-flex flex-wrap g-2">
              {productData?.map((node: TProductDetail) => (
                <Col sm={12} lg={6} key={node.id}>
                  <RecommendedItem data={node} />
                </Col>
              ))}
            </Col>
          </Col>

          <Col sm={6}>
            <SectionTitle
              label="Hand Picked for you"
              size="sm"
              className="p-0"
            />
            <DividerLine />
            <Col className="d-flex flex-wrap g-2">
              {productData?.map((node: TProductDetail) => (
                <Col sm={12} lg={6} key={node.id}>
                  <RecommendedItem data={node} />
                </Col>
              ))}
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Recommendations;
