import React from "react";
import { TCountDown } from "../../../lib/types";
import { styled } from "styled-components";

const StyledCountdown = styled.button`
  background-color: white;
  min-width: 4.5rem;
  padding: 0.65rem 0rem;
  border-radius: 50%;
  border: none;
  margin-right: 0.8rem;
`;
const CountdownTime = styled.div`
  font-size: 22.42px;
  font-weight: 700;
`;
const CountdownHour = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

const CountdownBtn: React.FC<{ data: TCountDown }> = ({ data }) => {
  const { id, time, hour } = data;
  return (
    <>
      <StyledCountdown key={id}>
        <CountdownTime>{time}</CountdownTime>
        <CountdownHour>{hour}</CountdownHour>
      </StyledCountdown>
    </>
  );
};

export default CountdownBtn;
