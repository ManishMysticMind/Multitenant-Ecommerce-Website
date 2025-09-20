import React, { useEffect } from "react";
import Button from "../common/Button";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { styled } from "styled-components";
import { useVerifyKhaltiPayment } from "../../../hooks/api/payment/VerifyPayment";

const OrderConfirmedMessage = () => {
  const router = useRouter();
  const { mutate } = useVerifyKhaltiPayment();
  const searchParams = useSearchParams();
  const orderStatus = searchParams.get("status");
  const pidx = searchParams.get("pidx");

  const purchase_order_id = searchParams.get("purchase_order_id");
  const transaction_id = searchParams.get("transaction_id");

  useEffect(() => {
    if (pidx) {
      mutate(pidx);
    }
  }, [pidx]);

  const continueShopping = () => {
    router.push("/");
  };

  return (
    <div className="m-5 p-4 text-center">
      <Image
        src={"/icons/TickIcon.png"}
        width={50}
        height={50}
        alt="Tick Icon"
      />
      <OrderSuccessTitle>Order {orderStatus} !</OrderSuccessTitle>
      <ThankYouText>
        Thank you for choosing us. We sent an email with your order confirmation
        and bill.{" "}
      </ThankYouText>
      <OrdeIdText>Your order #{purchase_order_id} has been placed.</OrdeIdText>
      <OrdeIdText>Transaction Id #{transaction_id}.</OrdeIdText>

      {/* <OrderTime>Time placed: 17/02/2020 12:45 CEST</OrderTime> */}
      <Button
        label="Continue Shopping"
        borderradius="4px"
        onClick={continueShopping}
      />
    </div>
  );
};

export default OrderConfirmedMessage;

const OrderSuccessTitle = styled.h4`
  font-size: 1.37rem;
  line-height: 2.063rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

const ThankYouText = styled.p`
  font-size: 0.75rem;
  line-hright: 1.1rem;
  color: #656565;
`;

const OrderTime = styled.p`
  color: #656565;
  font-size: 0.75rem;
  line-height: 1.1rem;
`;

const OrdeIdText = styled.p`
  color: #656565;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
`;
