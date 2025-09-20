import React from "react";
import { ToPayProductList } from "../../../../../lib/constants";
import { styled } from "styled-components";
import { Col } from "react-bootstrap";
import { CiShop } from "react-icons/ci";
import Image from "next/image";

const ToPayProducts = () => {
  return (
    <>
      <OrderCardWrapper className="d-flex flex-column gap-4 mt-4">
        {ToPayProductList.map((node: any) => (
          <Col sm={12} key={node.id} className="orderCard">
            <div className="d-flex justify-content-between statusBar">
              <div className="d-flex align-items-center fw-semibold gap-3">
                <CiShop />
                {node.store_name}
              </div>
              <OrderStatus>
                <div
                  className={`${
                    node.status === "Completed"
                      ? "status-completed"
                      : node.status === "Cancelled"
                        ? "status-cancelled"
                        : node.status === "In-Progress"
                          ? "status-inprogress"
                          : ""
                  }`}
                >
                  {node.status}
                </div>
              </OrderStatus>
            </div>
            <ProductDiv className="d-flex flex-wrap justify-content-between">
              <Col sm={9} className="d-flex gap-3">
                <Image src={node.image} width={82} height={82} alt="Product" />
                <div className="">
                  <ProductName className="fw-semibold">{node.name}</ProductName>
                  <div className="d-flex flex-row gap-1 productAttribute">
                    <div>{node.brand},</div>
                    <div>{node.size},</div>
                    <div>{node.color}</div>
                  </div>
                </div>
              </Col>
              <Col
                sm={1}
                className="d-flex align-items-center justify-content-center"
              >
                <ProductQuantity>Qty: {node.quantity}</ProductQuantity>
              </Col>
              <Col
                sm={2}
                className="d-flex align-items-center justify-content-end"
              >
                <ProductPrice>{node.price}</ProductPrice>
              </Col>
            </ProductDiv>
          </Col>
        ))}
      </OrderCardWrapper>
    </>
  );
};

export default ToPayProducts;

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
`;

const ProductDiv = styled.div`
  padding: 1.5rem;
  .productAttribute {
    opacity: 0.75;
    font-size: 12px;
  }
`;
const ProductPrice = styled.div`
  font-size: 1.375rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
`;
const ProductQuantity = styled.div`
  font-weight: 500;
`;
const ProductName = styled.div`
  font-size: 1.125rem;
`;
const OrderStatus = styled.div`
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
