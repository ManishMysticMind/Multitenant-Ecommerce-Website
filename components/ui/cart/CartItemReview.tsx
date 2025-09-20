import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import { formatCurrency } from "../../../lib/utils/utils";

interface MinusButtonProps {
  disabled?: boolean;
}
// Styled Components
const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

const CartItemContainer = styled.div`
  padding: 8px 0;
`;

const AddButton = styled.div`
  background-color: #f8f8f8;
  color: black;
  border-radius: 4.18px;
  border: 1px solid #c7c7c7;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const RemoveButton = styled(Button)`
  color: red;
  background: none;
  border: none;
  &:hover {
    text-decoration: underline;
    background: none;
  }
`;

const Quantity = styled.div`
  border: none;
  width: 50px;
  text-align: center;
  font-wight: 500;
`;

// CartItem Component
const CartItemReview = ({
  item,
  onRemove,
  onAddToWishlist,
  onChangeQuantity,
}: any) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onChangeQuantity(item.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    onChangeQuantity(item.id, quantity + 1);
  };

  return (
    <CartItemContainer>
      <Row className="d-flex justify-content-between align-items-center">
        <Col xs={12} md={6} className="d-flex  justify-content-start gap-2">
          <ProductImage src={item.product_image} alt={item.name} />
          <div>
            <h5 className="fs-6 fs-sm-5">{item.product_name} </h5>
            <p className="text-muted">
              {item.attributes &&
                Object.values(item.attributes)
                  .map((attr: any) => attr.name)
                  .join(", ")}
            </p>
          </div>
        </Col>
        <Col
          xs={6}
          md={2}
          className="d-flex justify-content-around align-items-center"
        >
          <div className="d-flex">
            <span className="fw-bold">Qty:</span>
            <Quantity className="mx-2">{quantity}</Quantity>
          </div>
        </Col>
        <Col
          xs={6}
          sm={2}
          className="text-right d-flex justify-content-around align-items-center "
        >
          {item?.price_with_discount > 1 ? (
            <>
              <h5 className="fs-6 fs-sm-5 mt-1">
                {formatCurrency(
                  item.price_with_discount * quantity,
                  item.currency
                )}
              </h5>
            </>
          ) : (
            <>
              <h5 className="fs-6 fs-sm-5 mt-1">
                {formatCurrency(item.price * quantity, item.currency)}
              </h5>
            </>
          )}
        </Col>
      </Row>
    </CartItemContainer>
  );
};

export default CartItemReview;
