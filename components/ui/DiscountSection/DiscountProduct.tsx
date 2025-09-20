import React from "react";
import { Container, Row } from "react-bootstrap";
import { discountProductList } from "../../../lib/constants";
import { DiscountProductDetail } from "../../../lib/types";
import DiscountProductCard from "./DiscountProductCard";
import SectionTitle from "../common/SectionTitle";

const DiscountProduct = () => {
  return (
    <>
      <Container className="mt-3 mb-3 mt-sm-0 mb-sm-5">
        <SectionTitle
          label="Top Product Categories"
          textalign="center"
          size="sm"
        />
        <Row className="gap-5 gap-md-4 flex-wrap flex-md-nowrap">
          {discountProductList.map((node: DiscountProductDetail) => (
            <DiscountProductCard data={node} key={node.id} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default DiscountProduct;
