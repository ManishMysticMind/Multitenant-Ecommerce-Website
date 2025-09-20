import { Col, Row } from "react-bootstrap";
import { useGetFilterProducts } from "../../../hooks/api/products/filterProduct";
import { useProductFilters } from "../../../hooks/useProductFilters";
import { TProductDetail } from "../../../lib/types";
import ProductListingShimmer from "../Shimmer/ProductListingShimmer";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useGetCategoryDetail } from "../../../hooks/api/category/getCategoryDetail";
import { capitalizeWords } from "../../../lib/utils/utils";
import { useParams, useSearchParams } from "next/navigation";

export default function ProductGrid() {
  const {
    search,
    category,
    collection,
    color,
    sizes,
    highlight,
    min_price,
    max_price,
    setFilters,
  } = useProductFilters();

  console.log(search);
  console.log(category);
  
  const { data: products, isLoading } = useGetFilterProducts({
    search,
    category,
    collection,
    color,
    sizes,
    highlight,
    min_price,
    max_price,
  });

  const [pageHeading, setPageHeading] = useState<string>("");
  const [pageBoldHeading, setPageBoldHeading] = useState<string>("");

  const searchParams = useSearchParams();

  const { category_slug } = useParams();

  const slug = searchParams.get("category") || category_slug;

  const { data: categoryDetail } = useGetCategoryDetail(String(slug));

  useEffect(() => {
    let title = "Showing results based on your filter";
    let boldTitle = search || "";
    // Count how many of the relevant variables are set
    const setCount = [search, category, collection, highlight].filter(
      Boolean
    ).length;
    // If more than one is set, print a message
    if (products?.results.length === 0) {
      title = "";
      boldTitle = "";
    } else if (setCount > 1) {
      // multiple filter are activated (base condition)
    } else if (search) {
      title = `Showing Search Results for`;
    } else if (category) {
      title = `${capitalizeWords(category)}`;
    } else if (collection) {
      title = `${capitalizeWords(collection)}`;
    } else if (highlight) {
      title = `${highlight}`;
    }
    setPageHeading(title);
    setPageBoldHeading(boldTitle);
  }, [search, category, collection, highlight, products?.results.length]);

  if (isLoading) return <ProductListingShimmer />;

  const NoSearchResultFound = ({ title }: { title: string }) => {
    return (
      <div className="text-center my-4">
        <h4 className="mb-3">
          No results found {title ? "for" : ""} {title}
        </h4>
        <p>Try searching for something else or browse our categories.</p>
      </div>
    );
  };
  return (
    <Row className="g-4">
      <h5 className="mb-3">
        {categoryDetail?.name} <strong>{pageBoldHeading}</strong>
      </h5>
      {products?.results?.length ? (
        products?.results?.map((product: TProductDetail, index: number) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <ProductCard key={index} data={product} />
          </Col>
        ))
      ) : (
        <NoSearchResultFound title={search || ""} />
      )}
    </Row>
  );
}
