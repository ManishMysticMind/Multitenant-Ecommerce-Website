import React from "react";
import { styled } from "styled-components";
import { Col } from "react-bootstrap";
import { CiShop } from "react-icons/ci";
import Image from "next/image";
import { TProductReview } from "../../../../../lib/constants";
import Button from "../../../common/Button";
import SectionTitle from "../../../common/SectionTitle";
import { FaRegTrashAlt } from "react-icons/fa";

const MyWishlist = () => {
  return (
    <>
      <OrderCardWrapper className="d-flex flex-column gap-3">
        <SectionTitle label="My Wishlist" size="md" className="pt-0 pb-3" />
        {TProductReview.map((store, storeIndex) => (
          <div key={storeIndex} className="store-section">
            <div className="d-flex justify-content-between statusBar">
              <div className="d-flex align-items-center fw-semibold gap-3">
                <CiShop />
                {store.store_name}
              </div>
            </div>
            {store.products.map((product) => (
              <Col sm={12} key={product.id} className="orderCard">
                <ProductDiv className="d-flex flex-wrap justify-content-between">
                  <Col sm={1} className="d-flex align-items-center ps-2">
                    <FaRegTrashAlt />
                  </Col>
                  <Col sm={6} className="d-flex gap-3">
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
                    <ProductPrice>{product.price}</ProductPrice>
                  </Col>
                  <Col
                    sm={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <OrderStatus>
                      <div
                        className={`${
                          product.stock === "In-stock"
                            ? "in-stock"
                            : product.stock === "Out-of-stock"
                              ? "out-of-stock"
                              : ""
                        }`}
                      >
                        {product.stock}
                      </div>
                    </OrderStatus>
                  </Col>
                  <Col
                    sm={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <Button
                      label="Add to Cart"
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

export default MyWishlist;

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
const ProductName = styled.div`
  font-size: 1.125rem;
`;
const OrderStatus = styled.div`
  .in-stock {
    color: #33ff41;
    background-color: #edffee;
    padding: 0.1rem 1rem;
    border-radius: 12px;
    font-weight: 500;
  }
  .out-of-stock {
    color: #f92950;
    background-color: #ffedf0;
    padding: 0.1rem 1rem;
    border-radius: 12px;
    font-weight: 500;
  }
`;
