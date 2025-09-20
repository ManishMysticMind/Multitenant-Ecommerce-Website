"use client";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import ContactUsForm from "../../components/forms/ContactUsForm";
import { useFilterWebSiteInfo } from "../../hooks/api/websetting";

const Page = () => {
  const { data: webInfo } = useFilterWebSiteInfo();
  return (
    <Container
      fluid
      className="d-flex flex-column flex-lg-row justify-content-center align-items-center py-3"
    >
      <Col className="justify-content-end d-sm-none d-md-none d-lg-flex">
        <Image src="/contact.png" width={500} height={500} alt="contact page" />
      </Col>
      <Col className="m-2 m-md-5">
        <h1 className="text-start mb-4">
          <PrimarySpan>Contact us </PrimarySpan>about anything related to our
          company
        </h1>
        <div>
          <div className="row g-0 justify-content-between w-100">
            <div className="col-12 col-xl-2 mb-4 pe-xl-3 flex-xl-grow-1">
              <PrimaryBorderDiv className="card">
                <div className="card-body d-flex align-items-center px-1 ">
                  <PrimarySpan
                    className="phone-icon pe-5 ps-3 pe-xl-4"
                    style={{ fontSize: "1.5rem" }}
                  >
                    &#9742;
                  </PrimarySpan>
                  <div>
                    <PrimarySpan>
                      <h6 className="my-0 text-start py-2">Phone Number</h6>
                    </PrimarySpan>
                    <p className="card-text text-start">
                      {webInfo?.owner_phone}
                    </p>
                  </div>
                </div>
              </PrimaryBorderDiv>
            </div>
            <div
              className="col-12 col-xl-2 ps-xl-3 flex-xl-grow-1"
              style={{ minWidth: "fit-content" }}
            >
              <PrimaryBorderDiv className="card">
                <div className="card-body d-flex align-items-center px-1 flex-grow-xl-1">
                  <PrimarySpan
                    className="email-icon pe-5 pe-xl-4 ps-3"
                    style={{ fontSize: "1.5em" }}
                  >
                    &#9993;
                  </PrimarySpan>
                  <div>
                    <PrimarySpan>
                      <h6 className="my-0 text-start py-2">Email Address</h6>
                    </PrimarySpan>
                    <p
                      className="card-text"
                      style={{ wordBreak: "break-word" }}
                    >
                      {webInfo?.owner_email}
                    </p>
                  </div>
                </div>
              </PrimaryBorderDiv>
            </div>
          </div>
          <Row className="mt-5">
            <ContactUsForm />
          </Row>
        </div>
      </Col>
    </Container>
  );
};

const PrimarySpan = styled.span`
  color: ${(props) => props?.theme?.colors?.primary};
`;
const PrimaryBorderDiv = styled.span`
  border-color: ${(props) => props?.theme?.colors?.primary};
`;

export default Page;
