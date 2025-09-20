import { Col, Container, Row } from "react-bootstrap";
import { TProductDetail } from "../../../lib/types";
import SectionTitle from "../common/SectionTitle";
import ProductListingShimmer from "../Shimmer/ProductListingShimmer";
import StyledLink from "../StyledLInk";
import ProductCard from "./ProductCard";
import { useGetProducts } from "../../../hooks/api/products/DynamicProduct";

export type TComponent = {
  id: string;
  type: string;
  component: string;
  component_type: string;
  specifications: TSpecifications;
  model: string;
};

export type TSpecifications = {
  id: number;
  rows: number;
  columns: number;
  horizontal_scroll: boolean;
  model:string;
};
const Products = ({ specifications }: TComponent) => {
  const { data: productData, isLoading } = useGetProducts(
    Number(specifications.id),
    specifications?.model
  );
  const numberOfItemsToRender = specifications.rows * specifications.columns;
  if (isLoading) return <ProductListingShimmer />;
  return (
    <>
      <Container className="p-4 p-sm-0">
        <div className="d-flex justify-content-between align-items-center">
          <SectionTitle label={productData?.name} size="md" />
          <StyledLink
            href={`/products/?collection=${productData?.slug}`}
            className="text-decoration-none"
            text="View all"
          />
        </div>
        <Row
          xs={2}
          sm={2}
          md={specifications.columns}
          lg={specifications.columns}
          className="g-3"
        >
          {productData?.products
            ?.slice(0, numberOfItemsToRender)
            .map((item: TProductDetail) => (
              <Col key={item?.id} className="p-0">
                {/* {component === "PRODUCT_LIST_TYPE_ONE" && ( */}
                  <ProductCard data={item} />
                {/* )} */}
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Products;

