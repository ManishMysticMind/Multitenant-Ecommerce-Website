"use client";

import React from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import styled from "styled-components";

const IconWrapper = styled.div`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled(CiCircleChevLeft)`
  cursor: pointer;
  font-size: 40px;
  margin-left:-1rem;

  @media screen and (min-width: 845px) {
    margin-left:-5rem;
  }
`;

export function SwiperPrevButton(props: any) {
  return (
    <IconWrapper {...props}>
      <StyledIcon />
    </IconWrapper>
  );
}
