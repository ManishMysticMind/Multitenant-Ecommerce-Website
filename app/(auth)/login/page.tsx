import React, { Suspense } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
const LoginForm = React.lazy(
  () => import("../../../components/ui/forms/LoginForm")
);
export default function Login() {
  return (
    <>
      <Container className="py-sm-5 my-4">
        <Row className="justify-content-center">
          <Col sm={12} md={5} className="d-flex flex-column gap-3 mt-4 mb-4">
            <Suspense fallback={"Loading"}>
              <LoginForm />
            </Suspense>
          </Col>
          {/* <Col sm={12} md={6} className="mt-4 mt-md-0">
            <Image
              src="/login.png"
              width={500}
              height={500}
              alt="Login"
              className="img-fluid"
            />
          </Col> */}
        </Row>
      </Container>
    </>
  );
}
