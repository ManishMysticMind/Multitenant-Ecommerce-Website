"use client";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionTitle from "../../../components/ui/common/SectionTitle";
import ResetPassword from "../../../components/ui/forms/resetPassword/ResetPassword";

const PasswordReset = () => {
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} lg={5} className="mt-4 mb-4">
            <SectionTitle label="Set Password" size="md" className="pb-2" />
            <p>Enter your new password</p>
            <ResetPassword />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PasswordReset;
