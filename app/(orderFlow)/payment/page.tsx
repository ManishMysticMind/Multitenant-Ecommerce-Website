"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import CartSummary from "../../../components/ui/cart/CartSummary";
import ModalComponent from "../../../components/ui/Modal";
import OrderConfirmedMessage from "../../../components/ui/orders/OrderConfirmedMessage";
import { useKhaltiPayment } from "../../../hooks/api/payment/CreateKhaltiPayment";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetOrderDetail } from "../../../hooks/api/order/GetOrderDetails";

const paymentMethods = [
  {
    title: "Debit/Credit Card",
    value: "debit/credit",
    image:
      "https://images.pexels.com/photos/30075349/pexels-photo-30075349/free-photo-of-boheme-match-collection-in-sunlit-minimalist-style.jpeg",
  },
  {
    title: "Cash on Delivery",
    value: "cash-on-delivery",
    image:
      "https://images.pexels.com/photos/10149616/pexels-photo-10149616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Khalti Wallet",
    value: "khalti-wallet",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6iuA5afXQAqElwakslhFezUlKGwV2o35NNg&s",
  },
];

const PaymentPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const { data: orderDetail } = useGetOrderDetail(Number(orderId));
  const { mutate, isSuccess, data: responseData } = useKhaltiPayment();
  const [selectedMethod, setSelectedMethod] = useState("khalti-wallet");

  const handleSelect = (value: React.SetStateAction<string>) =>
    setSelectedMethod(value);

  const handlePayment = () => {
    if (selectedMethod === "khalti-wallet") {
      mutate(Number(orderId));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(responseData?.payment_url);
    }
  }, [isSuccess]);

  return (
    <Container className="p-4">
      <Row>
        <PaymentMethodContainer lg={8} className="mb-4">
          <h4 className="mb-3">Select Payment Method</h4>
          <div className="d-flex flex-wrap gap-3">
            {paymentMethods.map((method, index) => (
              <PaymentMethodCard
                key={index}
                image={method?.image}
                $isSelected={selectedMethod === method.value}
                onClick={() => handleSelect(method.value)}
              >
                {selectedMethod === method.value && <CheckIcon>✔</CheckIcon>}
                <CardTitle>{method.title}</CardTitle>
              </PaymentMethodCard>
            ))}
          </div>
        </PaymentMethodContainer>
        <Col lg={4}>
          <CartSummary
            cart_data={orderDetail}
            label="Pay Now"
            showCoupon={false}
            handleClick={handlePayment}
          />
        </Col>
      </Row>
    </Container>
  );
};

const PaymentPage = () => (
  <Suspense fallback={<div>Loading Payment Page...</div>}>
    <PaymentPageContent />
  </Suspense>
);

export default PaymentPage;

const PaymentMethodContainer = styled(Col)`
  background-color: #ffffff;
  box-shadow: 0px 0px 12px 2px #0000000a;
  border-radius: 6px;
  padding: 10px 15px;
  margin-bottom: 1rem;
`;

const PaymentMethodCard = styled.div<{ image?: string; $isSelected: boolean }>`
  background-image: ${({ image }: any) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 124px;
  height: 108px;
  border-radius: 0.8rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: ${({ $isSelected, theme }) =>
    $isSelected
      ? `2px solid ${theme.colors.primary}`
      : "2px solid transparent"};
  transition: all 0.3s ease;
  &:hover {
    border-color: ${({ $isSelected, theme }) =>
      $isSelected
        ? `2px solid ${theme.colors.primary}`
        : `2px solid ${theme.colors.secondary}`};
  }
`;

const CardTitle = styled.p`
  font-size: 0.8rem;
  text-align: center;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  margin: 0;
  font-weight: 500;
  color: white;
  background-color: black;
  opacity: 0.5;
`;

const CheckIcon = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
