"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";

// Components
import CartSummary from "../../../components/ui/cart/CartSummary";
import ShippingInfo from "../../../components/ui/cart/ShippingInfo";
import SelectedProducts from "../../../components/ui/shipping/SelectedProducts";
import { ShippingForm } from "../../../components/ui/Checkout/ShippingForm";
import PaymentMethods from "../../../components/ui/Checkout/PaymentMethods";
import Loading from "../../../components/ui/Loading";

// Hooks
import { useAuth } from "../../../hooks/auth/useAuth";
import { useGetSelectedProducts } from "../../../hooks/api/cart/GetSelectedProducts";
import { useCreateOrder } from "../../../hooks/api/order/CreateOrder";
import { useGetUserShippingData } from "../../../hooks/api/shipping/GetUserShippingData";
import { useGetPaymentMethods } from "../../../hooks/api/payment/PaymentMethods";

// Utils
import { initConnectIPSPayment } from "../../../lib/cips";
import { useGetOrderDetail } from "../../../hooks/api/order/GetOrderDetails";

const CheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderIdFromUrl = searchParams.get("orderId");

  const { user } = useAuth();

  // Redirect guest users
  useEffect(() => {
    if (user?.is_guest) {
      router.push("/login");
    }
  }, [user]);

  const { data: cartData } = useGetSelectedProducts();
  useEffect(() => {
    if (!orderIdFromUrl && cartData && cartData.cart_items.length === 0) {
      router.push("/cart");
    }
  }, [cartData, orderIdFromUrl]);

  const { data: orderDetail, isLoading: orderDetailLoading } =
    useGetOrderDetail(Number(orderIdFromUrl));

  /** Shipping and Payment */
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);
  const { data: paymentMethods, isLoading: paymentMethodsLoading } =
    useGetPaymentMethods();

  useEffect(() => {
    if (paymentMethods && paymentMethods.length > 0) {
      setSelectedPaymentMethod(paymentMethods[0]);
    }
  }, [paymentMethods]);

  const { data: shippingAddress, refetch: refetchUserShippingAddress } =
    useGetUserShippingData(Number(user?.id));
  const [selectedShipping, setSelectedShipping] = useState<any>(undefined);

  useEffect(() => {
    if (shippingAddress?.results.length > 0) {
      setShowShippingForm(false);
      setSelectedShipping(shippingAddress.results[0]);
    } else {
      setShowShippingForm(true);
      setSelectedShipping(undefined);
    }
  }, [shippingAddress?.results]);

  useEffect(() => {
    if (selectedShipping && Object.keys(selectedShipping).length === 0) {
      setShowShippingForm(true);
    }
  }, [selectedShipping]);

  /** Create Order Logic */
  const {
    mutate: createOrder,
    isSuccess: isOrderCreated,
    data: orderResponse,
  } = useCreateOrder();

  const handlePlaceOrder = () => {
    if (selectedPaymentMethod && selectedShipping) {
      const transformedData = {
        id: selectedShipping?.id,
        name: selectedShipping?.name,
        email: selectedShipping?.email,
        phone: selectedShipping?.phone,
        country: String(selectedShipping?.country?.id),
        state: String(selectedShipping?.state?.id),
        city: String(selectedShipping?.city?.id),
        postal_code: selectedShipping?.postal_code,
        address: selectedShipping?.address,
      };
      const payload = {
        items: [],
        shipping_address: transformedData,
        payment_method: selectedPaymentMethod.id,
        coupon_code: "",
      };
      createOrder(payload);
    }
  };

  // Handle payment for existing order
  const handleProceedToPayment = () => {
    if (orderDetail && selectedPaymentMethod) {
      const orderToProcess = orderDetail;
      switch (selectedPaymentMethod.method) {
        case "COD":
          router.push(`/checkout/order-confirmed/${orderToProcess.id}`);
          break;
        case "CONNECT_IPS":
          initConnectIPSPayment(orderToProcess.total, orderToProcess.id);
          break;
        case "NPS":
          router.push(
            `/checkout/order-confirmed/${btoa(orderToProcess.id.toString())}`
          );
          break;
        default:
          break;
      }
    }
  };

  const initiatePayment = () => {
    if (orderResponse) {
      switch (orderResponse?.payment_method?.method) {
        case "COD":
          router.push(`/checkout/order-confirmed/${orderResponse.id}`);
          break;
        case "CONNECT_IPS":
          initConnectIPSPayment(orderResponse.total, orderResponse.id);
          break;
        case "NPS":
          router.push(
            `/checkout/order-confirmed/${btoa(orderResponse.id.toString())}`
          );
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (isOrderCreated && orderResponse) {
      initiatePayment();
    }
  }, [isOrderCreated]);

  if ((orderIdFromUrl && orderDetailLoading) || paymentMethodsLoading)
    return <Loading />;

  const displayItems = orderIdFromUrl
    ? orderDetail?.items
    : cartData?.cart_items;

  const cartDataForSummary =
    orderIdFromUrl && orderDetail
      ? {
          cart_items: orderDetail.items,
          sub_total: orderDetail.total,
          currency: orderDetail.currency,
        }
      : cartData;

  return (
    <CartContainer>
      <Row className="mt-2 mt-md-4">
        <Col lg={8} className="mb-4">
          {!showShippingForm && (
            <ShippingInfo
              selectedShippingInfo={selectedShipping}
              allShippingData={shippingAddress?.results}
              setSelectedShipping={setSelectedShipping as any}
            />
          )}
          {showShippingForm && (
            <ShippingForm
              onCancel={
                shippingAddress?.results.length > 0
                  ? () => setShowShippingForm(false)
                  : undefined
              }
              onSuccess={() => {
                setShowShippingForm(false);
                refetchUserShippingAddress();
              }}
            />
          )}

          <PaymentMethods
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            paymentMethods={paymentMethods}
          />

          <SelectedProducts selectedProducts={displayItems} />
        </Col>

        <Col lg={4}>
          <CartSummary
            cart_data={cartDataForSummary}
            handleClick={
              orderIdFromUrl ? handleProceedToPayment : handlePlaceOrder
            }
            label={orderIdFromUrl ? "Proceed to Payment" : "Place Order"}
            redirectPath="/checkout"
            selectedShipping={selectedShipping}
            showCoupon={!orderIdFromUrl}
          />
        </Col>
      </Row>
    </CartContainer>
  );
};

export default CheckoutPage;

const CartContainer = styled(Container)`
  padding: 20px;
  .active-method {
    border: 1px solid ${(props) => props.theme.colors.primary};
    background-color: rgba(153, 153, 153, 0.25);
  }
`;
