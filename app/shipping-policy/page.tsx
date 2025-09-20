"use client";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { useGetWebContent } from "../../hooks/api/webContent";
import Loading from "../../components/ui/Loading";

const Page = () => {
  const { data, isLoading } = useGetWebContent("shipping-policy");

  if (isLoading) return <Loading />;

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
    >
      <Row className="px-5 m-md-3">
        <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
      </Row>
    </Container>
  );
};

export default Page;
