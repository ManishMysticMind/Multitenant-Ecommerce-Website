"use client";

import React from "react";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import { SignupForm } from "../../../components/ui/forms/SignupForm";

export default function Login() {
  return (
    <>
      <Container className="py-sm-5 my-4">
        <Row className="justify-content-between">
          <Col sm={12} md={6} className="mb-4 mb-md-0">
            <Image
              src="/signup.png"
              width={701}
              height={816}
              alt="Login"
              className="img-fluid"
            />
          </Col>
          <SignupForm />
        </Row>
      </Container>
    </>
  );
}
