"use client";
import React from "react";
import SectionTitle from "../../../components/ui/common/SectionTitle";
import { Col, Container, Row } from "react-bootstrap";
import ForgetPassword from "../../../components/ui/forms/forgotPassword/ForgetPassword";

const ForgotPassword = () => {
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={5} className="mt-4 mb-4">
            <SectionTitle label="Reset Password" size="md" className="pb-2" />
            <p>
              Please enter your email address to receive a verification code.
            </p>
            <ForgetPassword />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgotPassword;
