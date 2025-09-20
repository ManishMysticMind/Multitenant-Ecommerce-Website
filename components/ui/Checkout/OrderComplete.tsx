"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Col, Row } from "react-bootstrap";
import { BsCartCheck } from "react-icons/bs";
import { FiBox, FiCreditCard, FiInfo, FiUser } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import { LuCopy, LuDot } from "react-icons/lu";
import styled from "styled-components";
import Button from "../common/Button";
import SectionTitle from "../common/SectionTitle";
import { formatCurrency, StatusColor } from "../../../lib/utils/utils";
import Loading from "../Loading";
import { useGetOrderDetail } from "../../../hooks/api/order/GetOrderDetails";
import { useAuth } from "../../../hooks/auth/useAuth";

const OrderComplete = () => {
  const router = useRouter();
  const { slug } = useParams();
  const { handleGuestAccess, role } = useAuth();

  const handleRedirectHome = () => {
    router.push("/");
  };

  useEffect(() => {
    handleGuestAccess("/");
  }, [role, handleGuestAccess]);

  const { data: orderDetails, isLoading } = useGetOrderDetail(Number(slug));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Heading>
        <SectionTitle label="ORDER DETAILS" size="md" className="pb-4" />
      </Heading>
      <OrderCompleteWrapper>
        <Row>
          <Col>
            <div className="userDetail">
              <FiUser className="mt-1 userIcon" />
              <div>
                <div>
                  {orderDetails?.shipping_address?.name} <LuDot />{" "}
                  {orderDetails?.shipping_address?.phone}
                </div>
                <div>{orderDetails?.shipping_address?.address}</div>
              </div>
            </div>
            <div className="userDetail">
              <BsCartCheck className="mt-1" />
              <div>
                <div>Order Number</div>
                <div className="d-flex align-items-center gap-2 mt-1">
                  #{orderDetails?.id}
                  <div
                    className="status"
                    style={{
                      color:
                        StatusColor[
                          orderDetails?.order_status as keyof typeof StatusColor
                        ] ?? "grey",
                      backgroundColor: StatusColor[
                        orderDetails?.order_status as keyof typeof StatusColor
                      ]
                        ? StatusColor[
                            orderDetails?.order_status as keyof typeof StatusColor
                          ] + "33"
                        : "#FFFFFF33",
                    }}
                  >
                    {orderDetails?.order_status ?? ""}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="userDetail">
              <FiCreditCard className="userIcon" />
              <div>
                <div>Payment Status</div>
                <div>{orderDetails?.payment_status[0] == "P" && "PENDING"}</div>
              </div>
            </div>
            <div className="userDetail">
              <FiBox className="userIcon" />
              <div>
                <div>Shipment Status</div>
                <div>{orderDetails?.shipping_status}</div>
              </div>
            </div>
          </Col>
        </Row>
        {/* <div className="userDetail">
          <LiaShippingFastSolid />
          <div>
            <div>Estimated Delivery : Jan 05 - 08, 2025</div>
          </div>
        </div> */}
        {orderDetails.items.map((item: any) => (
          <Row className="my-5" key={item.id}>
            <Col sm={7}>
              <div className="d-flex align-items-center flex-column flex-sm-row gap-3">
                <Image
                  src={item.product_image}
                  width={64}
                  height={64}
                  alt="Product Image"
                  className="object-fit-cover"
                  style={{ borderRadius: "6px" }}
                />
                <div>
                  <h5 className="fw-bold mb-2">{item.name}</h5>
                  {/* <p
                    className="m-0"
                    style={{ color: "#313131", fontSize: "14px" }}
                  >
                    5.5 * 20 Inches, Black & White
                  </p> */}
                </div>
              </div>
            </Col>
            <Col
              sm={2}
              className="d-flex justify-content-center align-items-center fw-semibold"
            >
              Qty : {item.quantity}
            </Col>
            <Col
              sm={3}
              className="d-flex justify-content-end align-items-center fw-semibold"
            >
              {formatCurrency(item?.total, item?.currency)}
            </Col>
          </Row>
        ))}

        {/* <div className="userDetail">
          <div>
            Tracking Number :{" "}
            <span>
              DEXNP012345678 <LuCopy className="ms-2" />
            </span>
          </div>
        </div> */}
        <hr style={{ color: "#DEDEDE", margin: "2rem 0rem" }} />
        <div className="d-flex justify-content-between mb-2">
          <Col>Sub-Total</Col>
          <Col className="d-flex justify-content-end fw-semibold">
            {formatCurrency(orderDetails?.sub_total, orderDetails?.currency)}
          </Col>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <Col>Discount</Col>
          <Col className="d-flex justify-content-end fw-semibold">
            {formatCurrency(
              orderDetails?.discount_amount,
              orderDetails?.currency
            )}
          </Col>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <Col>Shipping Fee</Col>
          <Col className="d-flex justify-content-end fw-semibold">
            {formatCurrency(
              orderDetails?.shipping_rate,
              orderDetails?.currency
            )}
          </Col>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Col>TOTAL PAID</Col>
          <Col className="d-flex justify-content-end fw-semibold totalPrice">
            {formatCurrency(orderDetails?.total, orderDetails?.currency)}
          </Col>
        </div>
      </OrderCompleteWrapper>
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
    </>
  );
};

export default OrderComplete;
const OrderCompleteWrapper = styled.div`
  padding: 1.75rem;
  box-shadow: 0px 0px 16px 2px #0000000a;
  border-radius: 8px;
  margin-bottom: 4rem;
  width: 100%;
  .sectionTitle {
    color: black;
  }
  .userDetail {
    color: #595959;
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  svg {
    font-size: 1.5rem;
  }
  span {
    color: #0059ff;
    margin-left: 0.3rem;
  }
  .totalPrice {
    font-size: ${(props) => props.theme.typography.fontSize.medium};
    color: ${(props) => props.theme.colors.textPrimary};
    font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  }
  @media screen and (max-width: 700px) {
    padding: 1rem;
    .userIcon {
      font-size: 3.5rem !important ;
    }
  }
  @media screen and (max-width: 950px) {
    .userIcon {
      font-size: 2rem;
    }
  }
  .status {
    padding: 0rem 1rem;
    border-radius: 12px;
    font-weight: 500;
    color: black;
    background-color: grey;
    font-size: 12px;
    text-align: center;
  }
`;
const Heading = styled.div`
  div {
    color: black !important;
  }
`;
