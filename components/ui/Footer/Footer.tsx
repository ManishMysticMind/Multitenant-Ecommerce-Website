"use client";
import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

import Button from "../common/Button";
import { ContactList } from "../../../lib/types/components";
import { informationList } from "../../../lib/constants";
import Logo from "../common/Logo";
import { useRouter } from "next/navigation";

import { TSiteInfo } from "../../../app/ClientWrapperProvider";
import { useGetWebContent } from "../../../hooks/api/webContent";

const FooterContainer = styled.div`
  background-color: #23292d;
  padding: 4rem 0rem;
  margin-top: 2rem;
  .newsletter {
    background-image: url(/footer-rec.png);
    background-repeat: no-repeat;
    color: white;
    padding-top: 2rem;
  }
  .form-style {
    display: flex;
  }
  .copyright {
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;
const Text = styled.p`
  color: white;
`;
const Title = styled.div`
  color: white;
  font-size: 23px;
  margin-bottom: 1rem;
  .hr {
    margin: 0.4rem 0rem;
    width: 2.5rem;
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.primary};

    height: 2px;
    opacity: unset;
  }
`;
const LinkStyle = styled.a`
  text-decoration: none;
  color: white;
  .hr {
    margin: 1rem 0rem;
    width: 1.5rem;
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.primary};
    height: 2px;
    opacity: unset;
  }
  .hr-dark {
    margin: 1rem 0rem;
    width: 100%;
    color: #2f363a;
    background-color: #2f363a;
    height: 2px;
  }
`;
const Option = styled.div`
  display: flex;
  flex-direction: column;
`;
const HR = styled.div`
  display: flex;
`;
const Info = styled("a").withConfig({
  shouldForwardProp: (prop) => prop !== "border",
})<Partial<ContactList>>`
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;
  text-decoration: none;
  padding-bottom: 1.5rem;
  border-bottom: ${(props) => {
    switch (props.border) {
      case "true":
        return "1px solid #2f363a";
      case "false":
        return "none";
      default:
        return "none";
    }
  }};
`;
const ContactIcon = styled.div`
  color: white;
  background-color: ${(props) => props.theme.colors.primary};

  padding: 0.6rem 0.9rem;
  border-radius: 50%;
`;
const Line = styled.div`
  margin: 0.3rem 0rem;
  width: 100%;
  color: #2f363a;
  background-color: #2f363a;
  height: 2px;
`;
const SubscribeBtn = styled.button`
  color: white;
  background-color: #f92950;
  padding: 0.8rem 2.5rem;
  border: unset;
  border-radius: 0rem 3rem 3rem 0rem;
  @media screen and (max-width: 600px) {
    padding: 0.8rem 0.5rem;
  }
`;
const Input = styled.input`
  padding: 0.8rem 2.5rem 0.8rem 1.5rem;
  border: unset;
  border-radius: 3rem 0rem 0rem 3rem;
  width: 70%;
`;
const Icons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  .social {
    background-color: ${(props) => props.theme.colors.primary};
    padding: 1rem;
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 50%;
  }
`;

const Footer = ({ siteInfo }: { siteInfo: TSiteInfo }) => {
  // const { data: siteInfo } = useFilterWebSiteInfo();
  const router = useRouter();
  const { data: aboutData, isLoading } = useGetWebContent("about");

  const contactList: ContactList[] = [
    {
      id: 1,
      title: siteInfo?.store_location || "N/A",
      redirect: "/",
      icon: <FaLocationDot />,
      border: "true",
    },
    {
      id: 2,
      title: siteInfo?.owner_phone || "N/A",
      redirect: "/",
      icon: <FaPhoneVolume />,
      border: "true",
    },
    {
      id: 3,
      title: siteInfo?.owner_email || "N/A",
      redirect: "/",
      icon: <IoIosMail />,
      border: "false",
    },
  ];
  return (
    <FooterContainer>
      <Container>
        <Row className="gap-4 ">
          <Col sm={12} md={4} className="d-flex flex-column gap-4">
            <Logo src={siteInfo?.logo_url} justifyitem="start" />
            <Text
              dangerouslySetInnerHTML={{ __html: aboutData?.excerpt || "" }}
            ></Text>
            <Button
              label="Read More"
              varient="primary"
              borderradius="24px"
              size="md"
              width="150px"
              type="button"
              className="mt-2"
              onClick={() => {
                router.push("/about");
              }}
            />
          </Col>
          {/* <Col sm={12} md={2}>
            <Title>
              Buyer Central
              <hr className="hr" />
            </Title>
            <Option>
              {buyerResource.map((node: any) => (
                <LinkStyle href={node.redirect} key={node?.id}>
                  {node.title}
                  <HR>
                    <hr className="hr" />
                    <hr className="hr-dark" />
                  </HR>
                </LinkStyle>
              ))}
            </Option>
          </Col> */}
          <Col sm={12} md={2}>
            <Title>
              Information
              <hr className="hr" />
            </Title>
            <Option>
              {informationList.map((node: any) => (
                <LinkStyle href={node.redirect} key={node?.id}>
                  {node.title}
                  <HR>
                    <hr className="hr" />
                    <hr className="hr-dark" />
                  </HR>
                </LinkStyle>
              ))}
            </Option>
          </Col>
          <Col sm={12} md={3} className="d-flex flex-column gap-3">
            <Title>
              Contact info
              <hr className="hr" />
            </Title>
            {contactList.map((node: any) => (
              <Info href={node.redirect} key={node?.id} border={node.border}>
                <ContactIcon>{node.icon}</ContactIcon>
                {node.title}
              </Info>
            ))}
          </Col>
        </Row>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
