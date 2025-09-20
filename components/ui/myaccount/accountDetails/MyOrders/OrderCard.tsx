import Image from "next/image";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { CiShop } from "react-icons/ci";
import styled from "styled-components";
import { formatCurrency, StatusColor } from "../../../../../lib/utils/utils";
import Button from "../../../common/Button";
import { ImageShimmer } from "../../../Shimmer/shimmerStyles";

const OrderCard = ({
  allOrders,
  status,
  onReviewClick,
}: {
  allOrders: any;
  status:
    | "order_status"
    | "payment_status"
    | "shipping_status"
    | "review_status";
  onReviewClick?: (product: any) => void;
}) => {
  return (
    <>
      <OrderCardWrapper className="d-flex flex-column gap-4 mt-4">
        {allOrders.length === 0 && <h5>No orders</h5>}
        {allOrders &&
          allOrders
            // .map((node: any) => {
            //   if (status !== "payment_status") return node;

            //   // blame the API,

            //   if (node.payment_status[0] === "P")
            //     node.payment_status = "PENDING";
            //   else if (node.payment_status[0] === "C")
            //     node.payment_status = "COMPLETED";
            //   // TODO: find this out
            //   else if (node.payment_status[0] === "F")
            //     node.payment_status = "STATUS: F";
            //   return node;
            // })
            .map((node: any) => (
              <Col sm={12} key={node.id} className="orderCard">
                <div className="d-flex justify-content-between statusBar">
                  <div className="d-flex align-items-center fw-semibold gap-3">
                    <OrderStatus>#{node.id}</OrderStatus>
                    <OrderStatus>
                      <div
                        className="status"
                        style={{
                          color:
                            StatusColor[
                              node.order_status as keyof typeof StatusColor
                            ] ?? "grey",
                          backgroundColor: StatusColor[
                            node.order_status as keyof typeof StatusColor
                          ]
                            ? StatusColor[
                                node.order_status as keyof typeof StatusColor
                              ] + "33"
                            : "#FFFFFF33",
                        }}
                        // className={`${
                        //   ["COMPLETED", "DELIVERED"].includes(node.order_status)
                        //     ? "status-completed"
                        //     : ["CANCELLED"].includes(node.order_status)
                        //       ? "status-cancelled"
                        //       : ["PENDING", "PROCESSING"].includes(
                        //             node.order_status,
                        //           )
                        //         ? "status-inprogress"
                        //         : ""
                        // }`}
                        // style={{backgorund-color:stutscolor["compledt"]}}
                      >
                        {node.order_status ?? ""}
                      </div>
                    </OrderStatus>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="d-flex justify-content-end gap-2 w-full py-2">
                      {"Total " + formatCurrency(node.total, node.currency)}
                    </div>
                    {node.payment_method !== "Cash on Delivery" && (
                      <>
                        {node.order_status === "PENDING" ? (
                          <Button
                            onClick={() => {
                              window.location.href =
                                "/checkout?orderId=" + node.id;
                            }}
                            varient="primary-outline"
                            label="Proceed to Payment"
                            borderradius="10px"
                            size="sm"
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                    {/* {node.store_name} where is the store name */}
                  </div>
                </div>
                {node.items.map((product: any) => {
                  // console.log("product", product);
                  return (
                    <ProductDiv
                      key={product.id}
                      className="row align-items-center justify-content-between"
                    >
                      <Col sm={4} className="d-flex gap-3">
                        <Image
                          src={
                            product.product_image ??
                            "/images/CardPlaceholder.png"
                          }
                          width={82}
                          height={82}
                          alt="Product"
                          className="cardImage"
                        />
                        <div className="">
                          <ProductName className="fw-semibold">
                            {product.name}
                          </ProductName>
                          <div className="d-flex flex-row gap-1 productAttribute">
                            {/* <div>Brand: {product.brand},</div>
                            <div>Size: {product.size},</div>
                            <div>Color: {product.color}</div> */}
                            {product.attributes &&
                              Object.entries(product.attributes).map(
                                ([key, value], index) => (
                                  <div key={index}>
                                    {String(key) + " : "}
                                    {String((value as any)?.name)}
                                  </div>
                                )
                              )}
                          </div>
                        </div>
                      </Col>
                      <Col
                        sm={1}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <ProductQuantity>
                          Qty: {product.quantity}
                        </ProductQuantity>
                      </Col>
                      <Col
                        sm={2}
                        className="d-flex align-items-center justify-content-end"
                      >
                        <ProductPrice>
                          {formatCurrency(product.price, product.currency)}
                        </ProductPrice>
                      </Col>
                      {node.order_status === "COMPLETED" &&
                      status === "review_status" ? (
                        <Col
                          sm={2}
                          className="d-flex align-items-center justify-content-end"
                        >
                          <Button
                            onClick={() =>
                              onReviewClick?.({
                                id: product.product,
                                order_id: product.order,
                                name: product.name,
                                color: product.attributes?.color || "N/A",
                                product_image: product.product_image,
                              })
                            }
                            varient="primary"
                            label="Review"
                            borderradius="4px"
                            size="sm"
                            className="reviewButton"
                          />
                        </Col>
                      ) : (
                        <></>
                      )}
                    </ProductDiv>
                  );
                })}
              </Col>
            ))}
      </OrderCardWrapper>
    </>
  );
};

export default OrderCard;

const OrderCardWrapper = styled.div`
  .orderCard {
    border: 0.4px solid #e7e7e7;
    border-radius: 6px;
  }
  .statusBar {
    padding: 0.8rem 1.5rem;
    border-bottom: 0.4px solid #e7e7e7;
  }
  svg {
    font-size: 1.5rem;
    stroke-width: 0.4;
  }
  .cardImage {
    width: 82px;
    height: 82px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const ProductDiv = styled.div`
  padding: 1.5rem;
  .productAttribute {
    opacity: 0.75;
    font-size: 12px;
  }
  @media screen and (max-width: 600px) {
    padding: 1rem;
  }
  .reviewButton {
    padding: 0.3rem 2rem;
  }
`;
const ProductPrice = styled.div`
  font-size: 1.175rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
`;
const ProductQuantity = styled.div`
  font-weight: 500;
`;
const ProductName = styled.div`
  font-size: 1.1rem;
`;
const OrderStatus = styled.div`
  .status {
    padding: 0.1rem 1rem;
    border-radius: 12px;
    font-weight: 500;
    color: black;
    background-color: grey;
    font-size: 12px;
  }
  .status-completed {
    color: #33ff41;
    background-color: #edffee;
    padding: 0.1rem 1rem;
    border-radius: 12px;
    font-weight: 500;
  }
  .status-cancelled {
    color: #f92950;
    background-color: #ffedf0;
    padding: 0.1rem 1rem;
    border-radius: 12px;
    font-weight: 500;
  }
  .status-inprogress {
    color: #fed700;
    background-color: #fffcea;
    padding: 0.1rem 1rem;
    border-radius: 12px;
    font-weight: 500;
  }
`;
