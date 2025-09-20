"use client";
import React, { Suspense } from "react";
import ProductGrid from "../../../components/ui/Products/ProductGrid";
import { Col, Row } from "react-bootstrap";
import Loading from "../../../components/ui/Loading";
import Sidebar from "../../../components/ui/Products/FilerationComponents/Sidebar";

const PageContent = () => {
  return (
    <div className="px-3 px-lg-5 my-5 mx-5">
      <Row>
        <Col sm={2}>
          <Sidebar />
        </Col>
        <Col sm={10}>
          <ProductGrid />
        </Col>
      </Row>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
