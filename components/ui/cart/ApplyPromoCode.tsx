import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import { useGetShippingRate } from "../../../hooks/api/order/postShippingRate";
import { useGetUserShippingData } from "../../../hooks/api/shipping/GetUserShippingData";
import { showToast } from "../../../lib/toast";

const PromoContainer = styled.div`
  position: relative;
  margin-top: 1.2rem;
`;

const PromoInput = styled(Form.Control)`
  padding-right: 90px; /* Ensure space for the button */
  border-radius: 5px;
`;

const ApplyButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  background: ${(props) => props.theme.colors.primary};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

interface ApplyPromoCodeProps {
  userId: number;
  applyCoupon: (promoCode: string) => void;
}

const ApplyPromoCode: React.FC<ApplyPromoCodeProps> = ({
  userId,
  applyCoupon,
}) => {
  const [promoCode, setPromoCode] = useState("");

  const handleApplyPromo = () => {
    if (!promoCode) {
      alert("Please enter a promo code");
      return;
    }
    applyCoupon(promoCode);
  };

  return (
    <PromoContainer>
      <PromoInput
        type="text"
        placeholder="Apply Promo Code"
        value={promoCode}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPromoCode(e.target.value)
        }
      />
      <ApplyButton onClick={handleApplyPromo}>
        <MdOutlineKeyboardArrowRight size={30} color="#fff" />
      </ApplyButton>
    </PromoContainer>
  );
};

export default ApplyPromoCode;
