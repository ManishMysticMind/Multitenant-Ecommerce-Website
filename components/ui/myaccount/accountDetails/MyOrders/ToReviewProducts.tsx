import React from "react";
import { styled } from "styled-components";
import { Col } from "react-bootstrap";
import { CiShop } from "react-icons/ci";
import Image from "next/image";
import { TProductReview } from "../../../../../lib/constants";
import Button from "../../../common/Button";

const ToReviewProducts = () => {
  return (
    <>
      <OrderCardWrapper className="d-flex flex-column gap-4 mt-4">
        {TProductReview.map((store, storeIndex) => (
          <div key={storeIndex} className="store-section">
            <div className="d-flex justify-content-between statusBar">
              <div className="d-flex align-items-center fw-semibold gap-3">
                <CiShop />
                {store.store_name}
              </div>
              <OrderStatus>
                <div
                  className={`${
                    store.status === "Completed"
                      ? "status-completed"
                      : store.status === "Cancelled"
                      ? "status-cancelled"
                      : store.status === "In-Progress"
                      ? "status-inprogress"
                      : ""
                  }`}
                >
                  {store.status}
                </div>
              </OrderStatus>
            </div>
            {store.products.map((product) => (
              <Col sm={12} key={product.id} className="orderCard">
                <ProductDiv className="d-flex flex-wrap justify-content-between">
                  <Col sm={7} className="d-flex gap-3">
                    <Image
                      src={product.image}
                      width={82}
                      height={82}
                      alt="Product"
                    />
                    <div>
                      <ProductName className="fw-semibold">
                        {product.name}
                      </ProductName>
                      <div className="d-flex flex-row gap-1 productAttribute">
                        <div>{product.brand},</div>
                        <div>{product.size},</div>
                        <div>{product.color}</div>
                      </div>
                    </div>
                  </Col>
                  <Col
                    sm={1}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <ProductQuantity>Qty: {product.quantity}</ProductQuantity>
                  </Col>
                  <Col
                    sm={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <ProductPrice>{product.price}</ProductPrice>
                  </Col>
                  <Col
                    sm={2}
                    className="d-flex align-items-center justify-content-end"
                  >
                    <Button
                      label="Review"
                      varient="primary"
                      borderradius="4px"
                      size="sm"
                      type="submit"
                      width="100%"
                    />
                  </Col>
                </ProductDiv>
              </Col>
            ))}
          </div>
        ))}
      </OrderCardWrapper>
    </>
  );
};

export default ToReviewProducts;

const OrderCardWrapper = styled.div`
  .store-section {
    border: 0.4px solid #e7e7e7;
    border-radius: 6px;
    padding-bottom: 1.5rem;
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
  padding: 1.2rem 1.5rem 0rem 1.5rem;
  .productAttribute {
    opacity: 0.75;
    font-size: 12px;
  }
`;
const ProductPrice = styled.div`
  font-size: 1.175rem;
  font-weight: 600;
  color: black;
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
