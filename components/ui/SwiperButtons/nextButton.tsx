"use client";

import React from "react";
import { CiCircleChevRight } from "react-icons/ci";
import styled from "styled-components";

const IconWrapper = styled.div`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled(CiCircleChevRight)`
  cursor: pointer;
  font-size: 40px;
  margin-right:-1rem;
    @media screen and (min-width: 845px) {
    margin-right:-4rem;
  }
`;

export function SwiperNextButton(props: any) {
    return (
        <IconWrapper {...props}>
            <StyledIcon />
        </IconWrapper>
    );
}
