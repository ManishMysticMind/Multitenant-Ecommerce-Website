import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Col, Container } from "react-bootstrap";
import { IoMdCheckmark } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
import { styled } from "styled-components";
import Button from "../common/Button";
import SectionTitle from "../common/SectionTitle";
import { MdOutlineSmsFailed, MdPending } from "react-icons/md";
import Loading from "../Loading";
import { useGetOrderDetail } from "../../../hooks/api/order/GetOrderDetails";
import { formatCurrency } from "../../../lib/utils/utils";
import { useGetConnectIpsStatus } from "../../../hooks/api/payment/GetConnectIPSStatus";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/auth/useAuth";

const OrderConfirmed = () => {
  const router = useRouter();
  const { slug } = useParams();
  const { checkToken, role, handleGuestAccess } = useAuth();
  const searchParams = useSearchParams();
  const {
    mutate: getConnectIPSStatus,
    isSuccess,
    data: connectIPSStatusResponseData,
  } = useGetConnectIpsStatus();

  useEffect(() => {
    handleGuestAccess("/");
  }, [role]);

  const isConnectIPS = () => {
    if (slug === "payment-success" || slug === "payment-failed") {
      try {
        console.log("searchParams", searchParams.get("TXNID"));
        return Number(searchParams.get("TXNID")) > 0;
      } catch (e) {
        return false;
      }
    }
    return false;
  };

  const getOrderId = () => {
    const isOrderId = !isNaN(Number(slug));

    if (isOrderId) {
      return Number(slug);
    }

    if (
      (!isOrderId && slug === "payment-success") ||
      slug === "payment-failed"
    ) {
      const txnId = searchParams.get("TXNID");
      if (txnId) return Number(txnId);
      else router.push("/");
    } else {
      router.push("/");
    }

    return null;
  };

  useEffect(() => {
    if (getOrderId() && isConnectIPS()) {
      getConnectIPSStatus(getOrderId());
    }
  }, []);

  const handleRedirectHome = () => {
    router.push("/");
  };
  const handleOrderDetail = () => {
    router.push(`/checkout/order-details/${getOrderId()}`);
  };

  const {
    data: orderDetails,
    isLoading,
    isError,
    error,
  } = useGetOrderDetail(getOrderId());

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    // Optionally narrow it to 404
    if ((error as Error).message === "Order not found") {
      return (
        <>
          <div>Order not found</div>
        </>
      );
    }

    router.push("/");
    return <Loading />;
  }

  const getTitle = () => {
    switch (orderDetails.order_status) {
      case "COMPLETED":
        return "Order Confirmed!";
      case "FAILED":
        return "Order Failed!";
      case "PENDING":
        return "Order Confirmed!";
    }

    return "";
  };

  return (
    <OrderConfirmedWrapper>
      <Container className="d-flex justify-content-center">
        <Col
          sm={12}
          md={6}
          className="d-flex justify-content-center flex-column align-items-center gap-2"
        >
          {orderDetails.order_status === "COMPLETED" && (
            <IoMdCheckmark className="checkIcon" />
          )}
          {orderDetails.order_status === "CANCELLED" && (
            <MdOutlineSmsFailed className="checkIcon" />
          )}
          {orderDetails.order_status === "PROCESSING" && (
            <IoMdCheckmark className="checkIcon" />
          )}
          {orderDetails.order_status === "PENDING" && (
            <IoMdCheckmark className="checkIcon" />
          )}
          <SectionTitle
            label={getTitle()}
            size="sm"
            className="sectionTitle p-0 fw-semibold"
          />
          <p
            className="px-4 text-center"
            style={{ color: "#757575", fontSize: "14px" }}
          >
            {orderDetails.order_status == "COMPLETED" ||
            orderDetails.order_status == "PENDING"
              ? "Your order has been successfully placed through online payment."
              : "Your order has been successfully placed but the payment has failed. Please try again."}
          </p>
          <PaymentDetails>
            <h5 className="fw-bold">PAYMENT DETAILS</h5>
            <hr style={{ color: "#DEDEDE", margin: "1rem 0rem" }} />
            <div className="d-flex justify-content-between mt-4">
              <DetailTitle>Order No.</DetailTitle>
              <DetailValue>#{orderDetails?.id}</DetailValue>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <DetailTitle>Shipping Address</DetailTitle>
              <DetailValue>
                {orderDetails?.shipping_address?.address}
              </DetailValue>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <DetailTitle>Shipping Fee</DetailTitle>
              <DetailValue>
                {formatCurrency(
                  orderDetails?.shipping_rate,
                  orderDetails?.currency
                )}
              </DetailValue>
            </div>
            {/* <div className="d-flex justify-content-between mt-2">
                <DetailTitle>Delivery Time Estimation</DetailTitle>
                <DetailValue>Jan 05 - 08, 2025</DetailValue>
              </div> */}
            <div className="d-flex justify-content-between mt-2">
              <DetailTitle>Amount Paid</DetailTitle>
              <DetailValue>
                {formatCurrency(orderDetails?.total, orderDetails?.currency)}
              </DetailValue>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <DetailTitle>Payment Method</DetailTitle>
              <DetailValue>{orderDetails?.payment_method}</DetailValue>
            </div>
            <div className="d-flex justify-content-end align-items-center w-100 mt-5 gap-4">
              <Link href="" className="text-decoration-none">
                DOWNLOAD RECEIPT
              </Link>
              <Button
                varient="primary"
                label={<>VIEW ORDER</>}
                borderradius="5px"
                width="175px"
                size="md"
                onClick={handleOrderDetail}
              />
            </div>
          </PaymentDetails>
          <div className="d-flex justify-content-center w-100 my-5 gap-3">
            <Button
              varient="secondary-outline"
              label={
                <>
                  GO BACK TO HOMEPAGE <IoChevronForward />
                </>
              }
              borderradius="5px"
              size="md"
              onClick={handleRedirectHome}
            />
          </div>
        </Col>
      </Container>
    </OrderConfirmedWrapper>
  );
};

export default OrderConfirmed;
const OrderConfirmedWrapper = styled.div`
  a {
    text-decoration: none;
    color: #2e2e2e;
  }
  .checkIcon {
    font-size: 6.25rem;
    color: white;
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 50%;
  }
  margin-top: 3rem;
`;
const PaymentDetails = styled.div`
  width: 100%;
  padding: 1.75rem;
  box-shadow: 0px 0px 16px 2px #0000000a;
  border-radius: 8px;
`;
const DetailTitle = styled.div`
  color: #757575;
  font-size: 14px;
`;
const DetailValue = styled.div`
  color: #595959;
  text-align: end;
`;
