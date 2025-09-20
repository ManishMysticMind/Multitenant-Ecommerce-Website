import React from "react";
import { Container } from "react-bootstrap";
import { CiDeliveryTruck, CiLocationOn } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { BsCurrencyDollar } from "react-icons/bs";
import styled from "styled-components";
import TopBarItem from "./TopBarItem";
import { redirect } from "next/dist/server/api-utils";

const Separator = styled.div`
  color: #ccc;
  margin: 0 10px;
  font-size: 14px;
`;
const TopBarContainer = styled.div`
  background-color: #f5f5f5;
`;
const TopBar = () => {
  return (
    <TopBarContainer className="d-none d-sm-block">
      <Container className="d-flex gap-2 py-3">
        <TopBarItem icon={<CiLocationOn /> } redirectPath="https://maps.app.goo.gl/GDXQ9eMfvGU1MmKr8" text={"Store Locator"} target="_blank" />
        <Separator>|</Separator>
        {/* <TopBarItem icon={<CiDeliveryTruck />} text={"Track Your Order"} />
        <Separator>|</Separator>
        <TopBarItem icon={<BsCurrencyDollar />} text={"Dollar (US)"} />
        <Separator>|</Separator> */}
        <TopBarItem
          icon={<GoPerson />}
          text={"Register or Sign in"}
          redirectPath="/login"
        />
      </Container>
    </TopBarContainer>
  );
};

export default TopBar;
