"use client";
import React from "react";
// import DetailPageBanner from "../../../components/ui/DetailPageBanner/DetailPageBanner";
import { RelatedProducts } from "../../../components/ui/Products/RelatedProducts";
import { useGetProductDetails } from "../../../hooks/api/products/getProductDetails";
import ProductInfo from "../../../components/ui/ProductDetail/ProductDetailSection";
import { useParams } from "next/navigation";
import Loading from "../../../components/ui/Loading";
import ProductDescription from "../../../components/ui/ProductDescription/ProductDescription";

export default function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductDetails(String(id));

  if (isLoading) return <Loading />;
  return (
    <>
      {/* <DetailPageBanner /> */}
      {data && <ProductInfo data={data} />}
      <ProductDescription data={data} />
      <hr />
      <RelatedProducts slug={String(id)} />
    </>
  );
}
