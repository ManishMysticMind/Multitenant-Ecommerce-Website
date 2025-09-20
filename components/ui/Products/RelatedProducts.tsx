import React from "react";
import ProductCard from "./ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import { styled } from "styled-components";
import { TProductDetail } from "../../../lib/types";
import SectionTitle from "../common/SectionTitle";
import { useGetRelatedProducts } from "../../../hooks/api/related/getRelatedProducts";

const ProductRow = styled.div`
  padding-bottom: 3rem;
  .secondTitle {
    color: #ff3030;
  }
`;
export const RelatedProducts = ({ slug }: { slug: string }) => {
  const { data: productData } = useGetRelatedProducts(slug);

  if (productData?.results?.length === 0) {
    return null; // Return null if there are no related products
  }
  return (
    <>
      <Container className="p-4 p-sm-0 mt-5">
        <ProductRow>
          <div className="d-flex">
            <SectionTitle
              label={"Related Products"}
              size="md"
              className="pb-3 pt-0 ms-2"
            />
          </div>
          <Row
            md={3}
            xs={2}
            lg={5}
            className={`g-3 px-3 ${
              productData?.results?.length >= 4
                ? "justify-content-between"
                : "justify-content-start gap-5"
            }`}
          >
            {productData?.results?.slice(0, 5).map((item: TProductDetail) => (
              <Col key={item?.id} className="p-0">
                <ProductCard data={item} />
              </Col>
            ))}
          </Row>
        </ProductRow>
      </Container>
    </>
  );
};
