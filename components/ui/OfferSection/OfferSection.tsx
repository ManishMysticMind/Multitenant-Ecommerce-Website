import React from "react";
import Image from "next/image";
import { styled } from "styled-components";
import Button from "../common/Button";
import SectionTitle from "../common/SectionTitle";
import CountdownBtn from "../common/CountdownBtn";
import { CountdownList } from "../../../lib/constants";
import { TCountDown } from "../../../lib/types";

const OfferContainer = styled.div`
  position: relative;
  .bgImage {
    width: 100%;
    object-fit: cover;
  }
`;

const OfferSectionDetail = styled.div`
  position: absolute;
  top: 17%;
  right: 15%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 25rem;
  @media screen and (max-width: 600px) {
    right: 0%;
    top: 13%;
    padding: 0rem 2rem;
  }
`;
const OfferPrice = styled.div`
  .OgPrice {
    font-size: 16px;
    text-decoration-line: line-through;
    color: #787878;
  }
  .DiscountPrice {
    font-size: 22px;
    font-weight: 600;
  }
`;
const OfferEnding = styled.div`
  font-size: 16.56px;
  font-weight: 500;
`;
const OfferTime = styled.div``;
const OfferSection = () => {
  return (
    <>
      <OfferContainer className="my-3">
        <Image
          src="/gadgets.jpg"
          alt="Offer Image"
          width={2000}
          height={687}
          className="bgImage"
        />
        <OfferSectionDetail>
          <Button
            label="THUNDER D9 DECOR"
            borderradius="32px"
            size="sm"
            width="220px"
          />
          <SectionTitle
            size="50px"
            label="Gaming Streeing Wheel PC"
            className="p-0"
          />
          <OfferPrice>
            <span className="DiscountPrice me-2">$1199.00</span>
            <span className="OgPrice">$1999.00</span>
          </OfferPrice>
          <OfferEnding>Hurry Up! Offer ends in:</OfferEnding>
          <OfferTime>
            {CountdownList.map((node: TCountDown) => (
              <CountdownBtn data={node} key={node.id} />
            ))}
          </OfferTime>
          <Button
            label="Shop Now"
            varient="secondary"
            borderradius="32px"
            size="lg"
            width="150px"
          />
        </OfferSectionDetail>
      </OfferContainer>
    </>
  );
};

export default OfferSection;
