import React, { useState, useCallback } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import styled from "styled-components";
// import { CiHeart } from "react-icons/ci";
import { useUpdateCartItem } from "../../../hooks/api/cart/UpdateCartItem";
import ModalComponent from "../Modal";
import { IoIosAlert } from "react-icons/io";
import { formatCurrency } from "../../../lib/utils/utils";

// Styled Components
const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

const CartItemContainer = styled.div`
  padding: 15px 0;
`;

const CartItemRow = styled(Row)`
  display: flex;
  align-items: center;
  justify-content: start;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const MinusButton = styled.div<{ disabled?: boolean }>`
  background-color: #f8f8f8;
  color: black;
  border-radius: 4.18px;
  border: 1px solid #c7c7c7;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  border-radius: 50%;
  padding-bottom: 7px;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
    color: white;
  }
`;

const AddButton = styled.div`
  background-color: #f8f8f8;
  color: black;
  border-radius: 4.18px;
  border: 1px solid #c7c7c7;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 50%;
  padding-bottom: 5px;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
    color: white;
  }
`;

const Quantity = styled.div`
  border: none;
  width: 50px;
  text-align: center;
  font-weight: 500;
`;

const ProductName = styled.h5`
  font-size: 1rem;
  margin-left: 0.4rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ProductPrice = styled.p`
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const CartItem = ({ item }: any) => {
  const { mutate } = useUpdateCartItem();
  const [quantity, setQuantity] = useState(item.quantity);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleDecrease = (cart_item_id: number) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      mutate({
        cart_id: item.cart,
        cart_item_id: cart_item_id,
        quantity: quantity - 1,
      });
    }
  };

  const setItemAsActive = (
    cart_item_id: number,
    selected: boolean,
    quantity: number
  ) => {
    mutate({
      cart_id: item.cart,
      cart_item_id: cart_item_id,
      quantity: quantity,
      selected: !selected,
    });
  };

  const handleIncrease = (cart_item_id: number) => {
    setQuantity(quantity + 1);
    mutate({
      cart_id: item.cart,
      cart_item_id: cart_item_id,
      quantity: quantity + 1,
    });
  };

  // Use useCallback to prevent unnecessary re-renders
  const handleOpenModal = useCallback((item: any) => {
    setSelectedItem(item); // Set the item first
    setShowModal(true); // Then trigger the modal
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedItem) {
      mutate({
        cart_id: selectedItem.cart,
        cart_item_id: selectedItem.id,
        quantity: 0,
      });
    }
    setShowModal(false);
    setSelectedItem(null);
  }, [selectedItem, mutate]);

  return (
    <>
      <CartItemContainer>
        <CartItemRow>
          <Col xs={1}>
            <StyledFormCheck
              className="cursor-pointer"
              type="checkbox"
              onChange={() =>
                setItemAsActive(item.id, item.selected, item?.quantity)
              }
              checked={item.selected}
            />
          </Col>
          <Col xs={6} sm={6} className="d-flex justify-content-start gap-1">
            <ProductImage
              src={
                item.product_image == "" || item.product_image == null
                  ? "/images/CardPlaceholder.png"
                  : item.product_image
              }
              alt={item.name}
            />
            <div className="d-none d-md-block">
              <ProductName>{item.product_name}</ProductName>
              {Object.values(item.attributes).length > 0 && (
                <>
                  <p className="text-muted">
                    {Object.values(item.attributes)
                      .map((attr: any) => attr.name)
                      .join(", ")}
                  </p>
                </>
              )}

              {/* <CiHeart size={25} style={{ cursor: "pointer" }} /> */}
              {/* <RiDeleteBinLine
                size={18}
                onClick={() => handleOpenModal(item)}
                style={{ cursor: "pointer" }}
              /> */}
            </div>
            <div className="d-block d-md-none">
              <ProductName className="mt-1 mb-0">
                {item.product_name}
              </ProductName>
              <ProductPrice className="m-0 d-block d-md-none fw-bold">
                {formatCurrency(item.price * quantity, item.currency)}
              </ProductPrice>
            </div>
          </Col>
          <Col
            xs={4}
            sm={4}
            md={2}
            className="d-flex align-items-center pt-sm-none"
          >
            <MinusButton
              disabled={quantity === 1}
              onClick={() => handleDecrease(item.id)}
            >
              -
            </MinusButton>
            <Quantity>{quantity}</Quantity>
            <AddButton onClick={() => handleIncrease(item.id)}>+</AddButton>
          </Col>
          <Col
            xs={2}
            sm={2}
            className="text-center pt-sm-none d-none d-md-block"
          >
            {item?.price_with_discount > 1 ? (
              <>
                <h5 className="fs-6 fs-sm-5 mt-1">
                  {formatCurrency(
                    item.price_with_discount,
                    item.currency
                  )}
                </h5>
                <h6
                  className=" mt-1 text-decoration-line-through"
                  style={{ fontSize: "13px" }}
                >
                  {formatCurrency(item.price, item.currency)}
                </h6>
              </>
            ) : (
              <>
                <h5 className="fs-6 fs-sm-5 mt-1">
                  {formatCurrency(item.price, item.currency)}
                </h5>
              </>
            )}
          </Col>
          <Col xs={1} className="d-none d-md-block text-center">
            <RiDeleteBinLine
              size={18}
              onClick={() => handleOpenModal(item)}
              style={{ cursor: "pointer", color: "red" }}
            />
          </Col>
        </CartItemRow>
      </CartItemContainer>

      {/* Modal Component */}
      <ModalComponent
        show={showModal}
        onModalClose={() => setShowModal(false)}
        onSubmitHandler={handleConfirmDelete}
      >
        {selectedItem ? (
          <>
            <div className="text-center">
              <IoIosAlert stroke="red" size={50} className="mb-3 text-danger" />
              <p>Are you want to remove this product form the cart ?</p>
            </div>

            <div className="d-flex justify-content-center align-items-center gap-2">
              <ProductImage
                src={selectedItem.product_image}
                alt={selectedItem.name}
              />
              <div className="d-flex flex-column justify-content-center">
                <h5 className="fs-6 fs-sm-5">{item.product_name} </h5>
                <p className="text-muted">
                  {item.attributes &&
                    Object.values(item.attributes)
                      .map((attr: any) => attr.name) // Access `name` instead of `value`
                      .join(", ")}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </ModalComponent>
    </>
  );
};

export default CartItem;

const StyledFormCheck = styled(Form.Check)`
  .form-check-input:checked {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;
