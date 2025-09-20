import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCategoryItem from "./ProductCategoryItem";
import { TCategory } from "../../../lib/types";
import SectionTitle from "../common/SectionTitle";
import { useGetCategoryList } from "../../../hooks/api/category/getCategoryList";

const ProductCategory = () => {
  const { data: categoryList } = useGetCategoryList();
  return (
    <Container className="px-0 my-4">
      <SectionTitle
        label="Top Product Categories"
        textalign="center"
        size="sm"
      />
      <Row xs={1} sm={2} md={3} className="w-100">
        {categoryList?.map((node: TCategory) => (
          <Col className="mb-4 ps-5 pe-3 ps-sm-0 pe-sm-2" key={node.id}>
            <ProductCategoryItem data={node} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductCategory;
