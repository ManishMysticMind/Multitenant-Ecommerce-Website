"use client";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SectionTitle from "../../../components/ui/common/SectionTitle";
import styled from "styled-components";
import VerifyOTP from "../../../components/ui/forms/verifyOTP/VerifyOTP";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useRouter } from "next/navigation";
import { GenericLink } from "../../../lib/constants/styles";

const OTPVerification = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const emailValue = searchParams.get("email");
    if (emailValue !== null || emailValue != "") {
      setEmail(emailValue + "");
    } else {
      router.push("/login");
    }

    if (!user.is_guest) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} lg={5} className="mt-4 mb-4">
            <SectionTitle
              label="Verify your Identity"
              size="md"
              className="pb-2"
            />
            <p>Please enter the OTP sent to your email</p>
            <div className="d-flex gap-1">
              <p className="me-1">
                E-mail: <strong>{email}</strong>
              </p>
              <GenericLink href="/forgot-password">(Change)</GenericLink>
            </div>
            <VerifyOTP email={email} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OTPVerification;

const ChangeMail = styled.a`
  color: #000dfe;
  text-decoration: none;
`;
