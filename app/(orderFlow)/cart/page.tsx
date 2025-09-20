"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import styled from "styled-components";
import CartItem from "../../../components/ui/cart/CartItem";
import CartSummary from "../../../components/ui/cart/CartSummary";
import { useGetCartDetails } from "../../../hooks/api/cart/GetCartDetails";
import ModalComponent from "../../../components/ui/Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { useDeleteCart } from "../../../hooks/api/cart/DeleteCart";
import { useRouter } from "next/navigation";
import { useSelectAllProductsInCart } from "../../../hooks/api/cart/SelectAllProductsInCart";
import Button from "../../../components/ui/common/Button";
import { IoIosArrowBack } from "react-icons/io";
import { useAuth } from "../../../hooks/auth/useAuth";
import SectionTitle from "../../../components/ui/common/SectionTitle";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosAlert } from "react-icons/io";
import { useGetCartCount } from "../../../hooks/api/cart/GetCartItemCount";

const CartPage = () => {
  const router = useRouter();
  const { checkToken, role } = useAuth();
  const { data: cart_data, isLoading } = useGetCartDetails();
  const { mutate } = useDeleteCart();
  const { mutate: selectAllProducts } = useSelectAllProductsInCart();
  const [selectedProducts, setSelectedProducts] = useState<Number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { data: cartCount } = useGetCartCount();

  const handleSelectedProducts = (cart_item_id: number) => {
    setSelectedProducts(
      (prev) =>
        prev.includes(cart_item_id)
          ? prev.filter((id) => id !== cart_item_id) // Remove if already present
          : [...prev, cart_item_id] // Add if not present
    );
  };

  const handleConfirmDelete = () => {
    if (showModal) {
      mutate(cart_data?.id);
      setShowModal(false);
    }
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const isCartEmpty = useMemo(() => {
    return (
      !Array.isArray(cart_data?.cart_items) || cart_data.cart_items.length === 0
    );
  }, [cart_data]);

  const handleSelectAllProductsInCart = (is_selected: Boolean) => {
    selectAllProducts(is_selected);
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (isCartEmpty) {
    return (
      <div className="d-flex justify-content-center">
        <div className="m-5 p-4">
          <h5 className="text-center p-3"> Cart is empty</h5>
          <Button
            varient="primary-outline"
            label="Continue Shopping"
            borderradius="5px"
            className="cursor-pointer"
            icon={<IoIosArrowBack size={22} />}
            onClick={() => router.push("/")}
          />
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="m-5 p-4">
          <h5> Loading..</h5>
        </div>
      </div>
    );
  }

  return (
    <CartContainer>
      <CartHeader>
        <SectionTitle label={`My Cart`} size="sm" className="m-0 p-0" />
        {!isCartEmpty && (
          <RemoveAllButton onClick={handleOpenModal}>
            <RiDeleteBinLine
              size={18}
              style={{ marginBottom: "2px", color: "red" }}
            />{" "}
            Remove all
          </RemoveAllButton>
        )}
      </CartHeader>
      <Row>
        <Col lg={8} className="mb-4">
          <CartProductsHeader>
            <Col xs={6} className="d-flex gap-2 align-items-center">
              <StyledFormCheck
                type="checkbox"
                className="cursor-pointer"
                onChange={() =>
                  handleSelectAllProductsInCart(!cart_data?.selected_all)
                }
                checked={cart_data?.selected_all}
              />
              <div className="countItem">
                Select All ({cartCount?.total}{" "}
                {cartCount?.total === 1 ? "Item" : "Items"})
              </div>
            </Col>
            {/* <Col xs={6} className="ps-4">
              Items
            </Col>
            <Col xs={2} className="text-center d-none d-md-block">
              Quantity
            </Col>
            <Col xs={2} className="text-end d-none d-md-block">
              Total Price
            </Col>
            <Col xs={1}></Col> */}
          </CartProductsHeader>
          <CartItemsContainer className="mt-3">
            {cart_data?.cart_items?.map((item: any, index: number) => (
              <div key={item.id}>
                <CartItem
                  item={item}
                  handleSelectedProducts={handleSelectedProducts}
                  selectedProducts={selectedProducts}
                />
                {index + 1 !== cart_data?.cart_items?.length && (
                  <hr style={{ color: "#E7E7E7" }} />
                )}
              </div>
            ))}
          </CartItemsContainer>
          <div className="text-center mt-4">
            <Button
              varient="primary-outline"
              label="Continue Shopping"
              borderradius="5px"
              className="cursor-pointer"
              icon={<IoIosArrowBack size={22} />}
              onClick={() => router.push("/")}
            />
          </div>
        </Col>
        <Col lg={4}>
          <CartSummary
            cart_data={cart_data}
            label={role === "guest" ? "Login and Checkout" : "Checkout"}
            handleClick={handleCheckout}
            redirectPath={"/cart"}
            showCoupon={false}
            showShippingFee={false}
            showGrandTotal={false}
          />
        </Col>
      </Row>
      {/* Modal Component */}
      <CartDeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirmDelete={handleConfirmDelete}
      />
    </CartContainer>
  );
};

const CartDeleteModal = ({
  showModal,
  setShowModal,
  handleConfirmDelete,
}: any) => {
  return (
    <ModalComponent
      show={showModal}
      onModalClose={() => setShowModal(false)}
      onSubmitHandler={handleConfirmDelete}
    >
      <div className="text-center">
        <IoIosAlert stroke="red" size={50} className="mb-3 text-danger" />
        <p className="mb-0">
          Are you sure you want to remove all items from your cart?
        </p>
      </div>
    </ModalComponent>
  );
};

export default CartPage;

const CartContainer = styled(Container)`
  padding: 20px;
`;

const CartHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  justify-content: space-between;
`;

const CartProductsHeader = styled(Row)`
  display: flex;
  background-color: #ffffff;
  padding: 10px 0px;
  // box-shadow: 0px 0px 12px 2px #0000000a;
  border-radius: 6px;
  margin: 0;
  .countItem {
    color: #757575;
    font-size: 0.9rem;
  }
`;

const CartItemsContainer = styled(Row)`
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 0px 10px;
  box-shadow: 0px 0px 12px 2px #0000000a;
  border-radius: 6px;
  margin: 0;
`;

const RemoveAllButton = styled.button`
  color: red;
  background: none;
  border: none;
  cursor: pointer;
  text-align: end;
  // position: absolute;
  // top: 0;
  // right: 0;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledFormCheck = styled(Form.Check)`
  .form-check-input:checked {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;
