import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { styled } from "styled-components";
import { useAddProductToCart } from "../../../hooks/api/cart/AddProductToCart";
import { useGetProductPriceByAttributes } from "../../../hooks/api/products/getProductPriceByAttributes";
import { TAttributeMapping, TProductDetail } from "../../../lib/types";
import Button from "../common/Button";
import SectionTitle, { TitleProps } from "../common/SectionTitle";
import ImageViewer from "../ImageViewer/ImageViewerItem";
import { ShimmerPrice } from "../Shimmer/common/ProductCardShimmer";
import Image from "next/image";
import { formatCurrency } from "../../../lib/utils/utils";
import { IoIosCart } from "react-icons/io";
import { useRouter } from "next/navigation";

const OriginalPrice = styled.div`
  color: #7e7e7e;
  text-decoration: line-through;
`;

const ColorCircle = styled.div`
  background-color: ${(props) => props.color};
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  margin: 0.3rem;
`;

const ProductSale = styled.div`
  position: absolute;
  top: 1rem;
  left: 2rem;
  button {
    color: ${(props) => props.theme.colors.backgroundLight};
  }
`;

const ProductDescription = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const ColorCheck = styled.div`
  border: 1px solid ${(props) => props.color};
  border-radius: 50%;
  width: fit-content;
  height: 2.05rem;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:has(input:checked) {
    border: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

const ProductSize = styled.div`
  display: flex;
  gap: 0.5rem;
  border-radius: 5px;

  select {
    border: none;
    border-radius: 5px;
    padding: 0.7rem;
    color: black;
    background-color: #E9E9E9;
    cursor: pointer;
    min-width: 5rem;
  }

  .checkSize {
    color: black;
    border: 1px solid black;
    border-radius: 5px;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:has(input:checked) {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.backgroundLight};
    border: none;
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-radius: 5px;
  padding: 0.6rem 0.5rem;
  button {
    background-color: #e9e9e9;
    color: black;
    border: none;
    font-weight: 500;
    border-radius: 50%;
    padding-bottom: 6px;
  }
  .countInput {
    border: none;
    text-align: center;
    width: 1rem;
  }
`;

const OldPriceDiv = styled("div")<Partial<TitleProps>>`
  font-size: ${(props) => {
    switch (props.size) {
      case "sm":
        return "20px";
      case "md":
        return "25px";
      case "lg":
        return "30px";
      default:
        return props?.size;
    }
  }};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  text-align: ${(props) => props?.textalign};
  text-decoration: line-through;
  color: ${(props) => props.theme.colors.primary};
`;

const ButtonSection = styled.div`
  button {
    width: 12rem;
  }
`;

const PriceDiv = styled("div").withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["size", "textalign", "theme"].includes(prop),
})<Partial<TitleProps>>`
  font-size: ${(props) => {
    switch (props.size) {
      case "sm":
        return "25px";
      case "md":
        return "30px";
      case "lg":
        return "35px";
      default:
        return props?.size;
    }
  }};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  text-align: ${(props) => props?.textalign};
  padding: 3rem 0rem;
`;

export type CartItem = {
  product: number;
  quantity: number;
  attributes: { key: string; value: string }[];
};

type ProductInfoProps = {
  data: TProductDetail;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ data }) => {
  const router = useRouter();
  const { mutate } = useAddProductToCart();
  const { mutate: getProductPrice, data: productPrice } =
    useGetProductPriceByAttributes();
  const {
    id,
    photos,
    name,
    price,
    avg_rating,
    description,
    attribute_mappings,
    short_description
  } = data;

  const [cartItem, setCartItem] = useState<CartItem>({
    product: id,
    quantity: 1,
    attributes: attribute_mappings.map((attr) => ({
      key: attr.product_attribute,
      value: attr.attributes_value[0]?.name || "",
    })),
  });

  const updateQuantity = (type: "inc" | "dec") => {
    setCartItem((prev: CartItem) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + (type === "inc" ? 1 : -1)),
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setCartItem((prev: CartItem) => ({
        ...prev,
        quantity: value,
      }));
    }
  };

  const addToCart = () => mutate({ cart_items: [cartItem] });
  const prevQuantityRef = useRef(cartItem.quantity);

  const handleRedirectShipping = () => {
    addToCart();
    router.push(`/cart`);
  };

  useEffect(() => {
    if (prevQuantityRef.current !== cartItem.quantity) {
      // If only quantity changed, return early (don't execute effect)
      prevQuantityRef.current = cartItem.quantity;
      return;
    }

    if (cartItem?.attributes.length) {
      const payload = {
        product_id: cartItem?.product,
        attributes: cartItem?.attributes,
      };
      getProductPrice(payload);
    }
  }, [cartItem]);

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col sm={12} md={4} className="ProductCol">
          <div className="position-relative">
            {/* <ProductSale>
              <Button label="Sale" borderradius="5px" size="sm" width="65px" />
            </ProductSale> */}
            {photos.length > 0 && <ImageViewer photos={photos} />}
            {photos.length === 0 && (
              <Image
                src="/images/CardPlaceholder.png"
                alt={""}
                width={600}
                height={600}
                style={{ height: "auto", width: "100%" }}
              />
            )}
          </div>
        </Col>
        <Col sm={12} md={6} className="d-flex flex-column gap-2">
          <ProductHeader
            name={name}
            avg_rating={Number(avg_rating)}
            price={productPrice?.price || data?.price}
            old_price={productPrice?.old_price || data?.old_price}
            currency={productPrice?.currency || data?.currency}
            price_with_discount={data?.price_with_discount}
            enable_inventory={data?.enable_inventory}
            stock_qty={data?.stock_qty}
          />
          {short_description != "" && (
            <>
              <hr style={{ borderTop: "3px dashed #DEDEDE" }} />
              <ProductDescription
                dangerouslySetInnerHTML={{ __html: short_description}}
              />
            </>
          )}
          <hr style={{ borderTop: "3px dashed #DEDEDE" }} />
          {attribute_mappings?.map((node: any) => (
            <ProductAttribute
              key={node.id}
              attribute={node}
              cartItem={cartItem}
              setCartItem={setCartItem}
            />
          ))}
          {/* <ProductActions cartItem={cartItem} updateQuantity={updateQuantity} addToCart={addToCart} /> */}
          <div className="d-flex justify-content-start flex-wrap">
            <p className="m-0 me-4 d-flex align-items-center">QTY</p>
            <Quantity>
              <Button
                label="-"
                borderradius="0px"
                size="sm"
                width="32px"
                onClick={() => updateQuantity("dec")}
              />
              <input
                type="number"
                value={cartItem?.quantity > 0 ? cartItem.quantity : 1}
                className="countInput remove-input-arrow"
                onChange={handleQuantityChange}
                min="1"
                required
              />
              <Button
                label="+"
                borderradius="0px"
                size="sm"
                width="32px"
                onClick={() => updateQuantity("inc")}
              />
            </Quantity>
          </div>
          <ButtonSection className="d-flex justify-content-start align-items-center gap-3 mt-4">
            <Button
              varient="primary-outline"
              label="Add to Cart"
              borderradius="5px"
              size="md"
              icon={<IoIosCart size={24} className="me-2" />}
              onClick={addToCart}
            />
            <Button
              varient="primary"
              label="Buy Now"
              borderradius="5px"
              size="md"
              onClick={handleRedirectShipping}
            />
          </ButtonSection>
          <div className="mt-4">
            <div className="d-flex gap-3">
              {data?.sku && (
                <div>
                  <strong>SKU:</strong> {data.sku}
                </div>
              )}
              {data?.tags && data.tags.length > 0 && (
                <div>
                  <strong>Tags:</strong> {data.tags.join(", ")}
                </div>
              )}
            </div>
            <br />
            {data?.categories && data.categories.length > 0 && (
              <div>
                <strong>Categories:</strong> {data.categories.join(", ")}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductInfo;

type ProductHeaderProps = {
  name: string;
  avg_rating: number;
  price: string | number;
  old_price: string | number;
  currency: string;
  price_with_discount?: string;
  enable_inventory: boolean;
  stock_qty: number;
};

const ProductHeader: React.FC<ProductHeaderProps> = ({
  name,
  avg_rating,
  price,
  old_price,
  currency,
  price_with_discount,
  enable_inventory,
  stock_qty,
}) => (
  <>
    {/* <div className="d-flex justify-content-between"> */}
    {/* <p className="mb-0">Category</p> */}
    {/* <div className="d-flex align-items-center gap-2">
        <Rating initialValue={Number(avg_rating)} size={14} readonly />
        <p className="mb-0">4 Review</p>
      </div> */}
    {/* </div> */}
    <SectionTitle label={name} size="md" className="p-0" />
    <hr style={{ borderTop: "3px dashed #DEDEDE" }} />
    <div>
      <div className="d-flex gap-2 align-items-center">
        <>
          <PriceDiv size="sm" className="p-0">
            {price_with_discount && Number(price_with_discount) > 0
              ? formatCurrency(Number(price_with_discount), currency)
              : formatCurrency(Number(price), currency)}
          </PriceDiv>
          {price_with_discount && Number(price_with_discount) > 0 && (
            <OriginalPrice>
              {formatCurrency(Number(price), currency)}
            </OriginalPrice>
          )}
          {!price_with_discount && old_price && Number(old_price) > 0 && (
            <OriginalPrice>
              {formatCurrency(Number(old_price), currency)}
            </OriginalPrice>
          )}
        </>
        {enable_inventory && stock_qty > 0 && (
          <SectionTitle
            label="(In stock)"
            size="16px"
            className="p-0 saleStock"
          />
        )}
      </div>
    </div>
  </>
);

type ProductAttributeProps = {
  attribute: TAttributeMapping;
  cartItem: CartItem;
  setCartItem: React.Dispatch<React.SetStateAction<CartItem>>;
};

// Drop_down = 'Drop down', 'Drop down'
// Radio_button = 'Radio button', 'Radio button'
// Checkboxes = 'Checkboxes','Checkboxes'
// TextBox = 'TextBox','TextBox'
// Multiline_textbox = 'Multiline Textbox', 'Multiline Textbox'
// Color_squares = 'Color Squares','Color Squares'
// Image_squares = 'Image Squares','Image Squares'

const ProductAttribute: React.FC<ProductAttributeProps> = ({
  attribute,
  cartItem,
  setCartItem,
}) => {
  console.log({ attribute, cartItem, setCartItem });
  if (attribute.attributes_value.length === 0) return null;
  return (
    <div className="d-flex align-items-center">
      <SectionTitle
        label={attribute.product_attribute.toUpperCase()}
        size="16px"
        className="p-0 me-3"
      />
      <div className="d-flex gap-3 flex-wrap">
        {attribute.control_type === "Drop down" && (
          <ProductSize>
            <select
              value={
                cartItem.attributes.find(
                  (a) => a.key === attribute.product_attribute
                )?.value || "" // Fallback to empty string if not found
              }
              onChange={(e) => {
                const newValue = e.target.value;
                setCartItem((prev) => ({
                  ...prev,
                  attributes: prev.attributes.map((a) =>
                    a.key === attribute.product_attribute
                      ? { ...a, value: newValue }
                      : a
                  ),
                }));
              }}
            >
              {attribute.attributes_value.map((node) => (
                <option key={node.id} value={node.name}>
                  {node.name}
                </option>
              ))}
            </select>
          </ProductSize>
        )}
        {/* {attribute.attributes_value.map((node) => (
          <div key={node.id} className="d-flex align-items-center">
            {attribute.product_attribute === "Color" && (
              <ColorCheck color={node.color_rgb as string}>
                <label className="checkBorder">
                  <input
                    type="radio"
                    className="d-none colorChecker"
                    name={attribute.product_attribute}
                    value={node.name}
                    checked={cartItem.attributes.some(
                      (a: { key: any; value: any }) =>
                        a.key === attribute.product_attribute &&
                        a.value === node.name,
                    )}
                    onChange={() =>
                      setCartItem((prev) => ({
                        ...prev,
                        attributes: prev.attributes.map((a) =>
                          a.key === attribute.product_attribute
                            ? { ...a, value: node.name }
                            : a,
                        ),
                      }))
                    }
                  />
                  <ColorCircle color={node.color_rgb as string} />
                </label>
              </ColorCheck>
            )}
            {attribute.product_attribute !== "Color" && (
              <>
                <ProductSize>
                  <input
                    type="radio"
                    className="d-none productSize"
                    id={node.name}
                    name={attribute.product_attribute}
                    value={node.name}
                    checked={cartItem.attributes.some(
                      (a) =>
                        a.key === attribute.product_attribute &&
                        a.value === node.name,
                    )}
                    onChange={() =>
                      setCartItem((prev) => ({
                        ...prev,
                        attributes: prev.attributes.map((a) =>
                          a.key === attribute.product_attribute
                            ? { ...a, value: node.name }
                            : a,
                        ),
                      }))
                    }
                  />
                  <label htmlFor={node.name} className="checkSize">
                    {node.name}
                  </label>
                </ProductSize>
              </>
            )}
          </div>
        ))} */}
      </div>
    </div>
  );
};
