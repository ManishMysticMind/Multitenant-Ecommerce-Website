import React from "react";
import { styled } from "styled-components";
import CartItemReview from "../cart/CartItemReview";
import { useGetSelectedProducts } from "../../../hooks/api/cart/GetSelectedProducts";
import { Row } from "react-bootstrap";
import SectionTitle from "../common/SectionTitle";
import Loading from "../Loading";

const SelectedProducts = ({
  selectedProducts,
}: {
  selectedProducts: any[];
}) => {
  if (selectedProducts?.length == 0) return null;

  return (
    <CartItemsContainer>
      <SectionTitle label="Selected Products" className="pt-0 pb-0 fw-bold" />
      {selectedProducts?.map((item: any, index: number) => (
        <div key={index}>
          <CartItemReview item={item} />
          {index + 1 !== selectedProducts?.length && (
            <hr className="mb-2" style={{ color: "#E7E7E7" }} />
          )}
        </div>
      ))}
    </CartItemsContainer>
  );
};

export default SelectedProducts;

const CartItemsContainer = styled(Row)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  padding: 15px;
  box-shadow: 0px 0px 12px 2px #0000000a;
  border-radius: 6px;
  margin-top: 0.8rem;
  margin: 0;
`;
